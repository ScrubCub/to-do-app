import { createElements, checkProjectExistence, updateTaskProjectParent, compareTime } from "./utils";
import { createProjectDialogWindow, createProject } from "./project";
import { createTask } from "./task.js";
import { startOfToday } from "date-fns";
import { populateContentWithTasks, showAllTasksOfProject } from "./content.js";

const body = document.querySelector('body');
const today = startOfToday();

function getProjectAndTasks(globalProjectList, projectTitle) {
    let projectObject = JSON.parse(globalProjectList.getItem(`${projectTitle}`));
    let tasks = projectObject.tasks;

    return [projectObject, tasks];
}

export function editProject(globalProjectList, projectTitle) {

    let taskList = [];
    const [
        editProjectButton,
        newSubmitTaskButton
    ] = createElements('button', 2);

    editProjectButton.type = 'button';
    editProjectButton.textContent = 'Edit Project';
    newSubmitTaskButton.type = 'button';
    newSubmitTaskButton.textContent = 'Submit';

    let [project, tasks] = getProjectAndTasks(globalProjectList, projectTitle);
    let projectDialogWindow = createProjectDialogWindow();
    body.appendChild(projectDialogWindow);
    projectDialogWindow.showModal();

    projectDialogWindow.addEventListener('cancel', (event) => {
        event.preventDefault();
    });

    let projectDiv = document.getElementById('project_div');
    let projectTitleInput = document.getElementById('project_title_input');
    let projectDescInput = document.getElementById('project_desc_input');
    let oldAddNewTaskBtn = document.getElementById('add_new_task_button');
    let submitProjectButton = document.getElementById('submit_project_button');
    let cancelProjectCreation = document.getElementById('cancel_project_creation');
    let taskNameInput = document.getElementById('task_name_input');
    let oldSubmitTaskButton = document.getElementById('submit_task_button');
    let dateInput = document.getElementById('date');
    let taskStartInput = document.getElementById('task_start');
    let taskEndInput = document.getElementById('task_end');
    let priorityBox = document.getElementById('priority_box');
    
    projectTitleInput.value = project.title;
    projectDescInput.value = project.description;
    projectDiv.style.maxHeight = '127px';

    tasks.forEach((task) => {
        createTask(taskList, task.task, task.date, task.start, task.end, task.priority);
        let height = Number(projectDiv.getAttribute('style').slice(12, -3));
        projectDiv.style.maxHeight = `${height + 113}px`;
        console.log(taskList);  
    })

    submitProjectButton.replaceWith(editProjectButton);
    oldSubmitTaskButton.replaceWith(newSubmitTaskButton);

    newSubmitTaskButton.addEventListener('click', () => {

        if (new Date(dateInput.value).getTime() < today.getTime()) {
            console.log('Date is invalid');
            return
        }

        if (compareTime(taskStartInput.value, taskEndInput.value)) {
            console.log('Error time end is earlier than time start');
            return
        }
        if (taskNameInput.value) {
            console.log(taskList);

            createTask(taskList, taskNameInput.value, dateInput.value, taskStartInput.value, taskEndInput.value, priorityBox.value)
            taskNameInput.value = '';

            
            
        } else {
            //Add error message; implement same logic as the one in proj
        }
    })

    editProjectButton.addEventListener('click', () => {
        let existence = checkProjectExistence(projectTitleInput.value, globalProjectList, 'edit', project.title);
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

        globalProjectList.removeItem(projectTitle);
        let oldProjectDiv = document.getElementById(`project_${project.title}`);
        let newProjectDiv = createProject(projectTitleInput.value, projectDescInput.value, taskList);
        let [newProject, newTaskList] = getProjectAndTasks(globalProjectList, projectTitleInput.value);

        oldProjectDiv.replaceWith(newProjectDiv);
        updateTaskProjectParent(projectTitleInput.value, taskList);
        taskList = [];
        
        let actualTaskList = showAllTasksOfProject(newProject);
        populateContentWithTasks(actualTaskList, newProject);

        projectDialogWindow.close();
        projectDialogWindow.remove();

    })


    
}