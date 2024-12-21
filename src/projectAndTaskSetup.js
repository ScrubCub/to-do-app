import taskWindow from "./task.js";
import projectWindow from "./project.js";
import { appendAllChildren } from "./utils.js";

const body = document.querySelector('body');

export function createProject() {
    appendAllChildren(body, [projectWindow, taskWindow]); 
    let addNewTaskBtn = document.querySelector('#add_new_task_button');
    let projectDialogWindow = document.querySelector('#project_dialog_window');
    let taskDialogWindow = document.querySelector('#task_dialog_window');
    let createProjectBtn = document.createElement('button');

    createProjectBtn.type = 'button';
    createProjectBtn.textContent = 'create project';
    createProjectBtn.addEventListener('click', () => {
        projectDialogWindow.showModal();
    })

    addNewTaskBtn.addEventListener('click', () => {
        taskDialogWindow.showModal();

    });
    
    body.appendChild(createProjectBtn);
    

}