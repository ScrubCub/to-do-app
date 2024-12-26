import { createElements, appendAllChildren, createProjectObject, updateTaskProjectParent, deleteProjectFromList, checkProjectExistence } from "./utils.js";
import { globalProjectList } from "./entry.js";
import { createTaskDiv } from "./task.js";
import { showAllTasksOfProject, populateContentWithTasks, createContentDiv } from "./content.js";

export function initProjectList(globalProjectList) {
    let projectList = document.querySelector('#project_list_div');
    // globalProjectList.clear();
    for (let i = globalProjectList.length - 1; i >= 0; i--) {
        let currentProjectObject = JSON.parse(globalProjectList.getItem(globalProjectList.key(i)));
        let projectDiv = createSidebarProjectDiv(currentProjectObject, globalProjectList);

        projectList.appendChild(projectDiv);
    }
}

function createProject(title, desc, taskList) {
    const projectObject = createProjectObject();
    let projectList = document.querySelector('#project_list_div');


    projectObject.title = title
    projectObject.description = desc
    projectObject.id = `id_${title}`;
    projectObject.tasks = taskList;
    globalProjectList.setItem(title, JSON.stringify(projectObject));

    let projectDiv = createSidebarProjectDiv(JSON.parse(globalProjectList.getItem(`${title}`)), globalProjectList);

    projectList.appendChild(projectDiv);
}

function createSidebarProjectDiv(projectObject, globalProjectList) {
    let [
        projectDiv,
        projectDetails,
    ] = createElements('div', 2);

    let [
        deleteProjectButton,
        editProjectButton
    ] = createElements('button', 2);

    let [
        projectName,
        projectDesc
    ] = createElements('p', 2);

    appendAllChildren(projectDiv, [deleteProjectButton, projectDetails]);
    appendAllChildren(projectDetails, [projectName, projectDesc])

    projectDiv.className = 'projects';

    projectDesc.id = 'project_description';

    projectName.textContent = projectObject.title;
    projectDesc.textContent = projectObject.description;
    
    deleteProjectButton.type = 'button';
    deleteProjectButton.textContent = 'X';

    projectDetails.addEventListener('click', () => {
        let taskList = showAllTasksOfProject(projectObject);
        populateContentWithTasks(taskList, projectObject);
    })

    deleteProjectButton.addEventListener('click', () => {
        let contentDiv = document.querySelector('body > div > div:last-child');
        contentDiv.replaceWith(createContentDiv());
        projectDiv.remove();
        deleteProjectFromList(projectObject.title, globalProjectList);
        // remove project from list
    });

    editProjectButton.addEventListener('click', () => {

    })

    return projectDiv;
}

export function createProjectDialogWindow() {
    let taskList = [];
    const [
        projectDiv,
        projectTitleInputDiv,
        projectDescDiv,
        buttonsDiv
    ] = createElements('div', 4);
    
    const [
        projectTitleInput,
    ] = createElements('input', 1);
    
    const [
        addNewTaskBtn,
        submitProjectButton,
        cancelProjectCreation
    ] = createElements('button', 3);
    
    const projectDialogWindow = document.createElement('dialog');
    projectDialogWindow.id = 'project_dialog_window';

    const taskDiv = createTaskDiv(taskList);

    const projectDescInput = document.createElement('textarea');
    projectDescInput.maxLength = '200';

    projectDiv.id = 'project_div';
    projectDiv.style.maxHeight = '127px';
    
    appendAllChildren(projectDiv, [projectTitleInputDiv, projectDescDiv, buttonsDiv, taskDiv]);
    projectDialogWindow.appendChild(projectDiv);
    projectTitleInputDiv.appendChild(projectTitleInput);
    projectDescDiv.appendChild(projectDescInput);
    appendAllChildren(buttonsDiv, [addNewTaskBtn, submitProjectButton, cancelProjectCreation]);

    projectTitleInputDiv.className = 'project_inputs_div';
    projectDescDiv.className = 'project_inputs_div';
    buttonsDiv.className = 'project_inputs_div';

    projectTitleInput.placeholder = 'Enter title here. Maximum of 30 characters';
    projectTitleInput.id = 'project_title_input';
    projectTitleInput.maxLength = '30';

    projectDescInput.placeholder = 'Enter a brief description here. Maximum of 200 characters.';
    projectDescInput.id = 'project_desc_input';

    addNewTaskBtn.textContent = 'Add new task';
    addNewTaskBtn.id = 'add_new_task_button';

    submitProjectButton.textContent = 'Submit Project';
    submitProjectButton.id = 'submit_project_button';

    cancelProjectCreation.textContent = 'Cancel';
    cancelProjectCreation.id = 'cancel_project_creation';

    addNewTaskBtn.addEventListener('click', () => {
        
        projectDiv.style.maxHeight = `${projectDiv.offsetHeight + 113}px`;

    });

    cancelProjectCreation.addEventListener('click', () => {
        projectDialogWindow.close();
        projectDialogWindow.remove();
    })

    submitProjectButton.addEventListener('click', () => {
        let existence = checkProjectExistence(projectTitleInput.value, globalProjectList);
        let projectDialogWindow = document.querySelector('#project_dialog_window');
        if (!projectTitleInput.value) {
            console.log('empty title');
            return
        }

        if (existence) {
            console.log('Duplicate');
            return
        }

        if (!taskList.length) {
            console.log('no task');
            return
        }

        createProject(projectTitleInput.value, projectDescInput.value, taskList);
        updateTaskProjectParent(projectTitleInput.value, taskList);
        taskList = [];
        projectDialogWindow.close();
        projectDialogWindow.remove();

        
    })

    return projectDialogWindow;

};