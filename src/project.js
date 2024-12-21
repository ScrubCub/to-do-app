import { createElements, appendAllChildren, createProjectObject, updateTaskProjectParent } from "./utils.js";
import { globalProjectList } from "./entry.js";
import { createTaskDiv } from "./task.js";

export function createProjectDialogWindow() {
    let taskList = [];
    const [
        projectDiv,
        projectTitleInputDiv,
        projectDescDiv,
        addNewTaskDiv
    ] = createElements('div', 4);
    
    const [
        projectTitleInput,
    ] = createElements('input', 1);
    
    const [
        addNewTaskBtn,
        submitProjectButton
    ] = createElements('button', 2);
    
    const projectDialogWindow = document.createElement('dialog');
    projectDialogWindow.id = 'project_dialog_window';

    const projectDescInput = document.createElement('textarea');
    // projectDescInput.setAttribute('maxlength', '200');
    projectDescInput.maxLength = '200';

    projectDiv.id = 'project_div';
    
    appendAllChildren(projectDiv, [projectTitleInputDiv, projectDescDiv, addNewTaskDiv, submitProjectButton]);
    projectDialogWindow.appendChild(projectDiv);
    projectTitleInputDiv.appendChild(projectTitleInput);
    projectDescDiv.appendChild(projectDescInput);
    addNewTaskDiv.appendChild(addNewTaskBtn);

    projectTitleInput.placeholder = 'Enter title here';
    projectTitleInput.id = 'project_title_input';

    projectDescInput.placeholder = 'Enter a brief description here. Maximum of 200 characters.';
    projectDescInput.id = 'project_desc_input';

    addNewTaskBtn.textContent = 'Add new task';
    addNewTaskBtn.id = 'add_new_task_button';

    submitProjectButton.textContent = 'Submit Project';
    submitProjectButton.id = 'submit_project_button';

    addNewTaskBtn.addEventListener('click', () => {
        let taskDiv = createTaskDiv(taskList);
        projectDiv.appendChild(taskDiv);

    });

    submitProjectButton.addEventListener('click', () => {
        projectDialogWindow.close();
        let projectTitleDiv = document.createElement('div');
        let projectList = document.querySelector('#project_list_div');
        let title = projectTitleInput.value;
        let desc = projectDescInput.value;
        projectTitleDiv.textContent = title;
        projectList.appendChild(projectTitleDiv);
        const projectObject = createProjectObject(title, desc, taskList);
        updateTaskProjectParent(title, taskList);
        taskList = [];
        globalProjectList.push(projectObject);
        console.log(globalProjectList[0].tasks);
        projectDialogWindow.remove();
        // add updater for main window
    })

    return projectDialogWindow;

};