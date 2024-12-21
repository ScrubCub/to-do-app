import { createElements, appendAllChildren } from "./utils.js";


//exports a d
export default (function createProjectDialogWindow() {
    const [
        projectDiv,
        projectTitleDiv,
        projectDescDiv,
        addNewTaskDiv
    ] = createElements('div', 4);
    
    const [
        projectTitleInput,
        projectDescInput
    ] = createElements('input', 2);
    
    const [
        addNewTaskBtn
    ] = createElements('button', 1);
    
    const projectDialogWindow = document.createElement('dialog');
    projectDialogWindow.id = 'project_dialog_window';
    
    appendAllChildren(projectDiv, [projectTitleDiv, projectDescDiv, addNewTaskDiv]);
    projectDialogWindow.appendChild(projectDiv);
    projectTitleDiv.appendChild(projectTitleInput);
    projectDescDiv.appendChild(projectDescInput);
    addNewTaskDiv.appendChild(addNewTaskBtn);

    projectTitleInput.placeholder = 'Enter title here';
    projectTitleInput.id = 'project_title_input';

    projectDescInput.placeholder = 'Enter a brief description here. Maximum of 200 characters.';
    projectDescInput.id = 'project_desc_input';

    addNewTaskBtn.textContent = 'Add new task';
    addNewTaskBtn.id = 'add_new_task_button';

    addNewTaskBtn.addEventListener('click', () => {
        // createNewTask(); 

    });

    return projectDialogWindow;

})();