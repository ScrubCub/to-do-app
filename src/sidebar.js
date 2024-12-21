import { appendAllChildren, createElements } from "./utils";
import { createProjectDialogWindow } from "./project.js";


const body = document.querySelector('body');


export default (function() {
    const [
        sidebarDiv,
        sidebarLogo,
        addNewProjectDiv,
        projectListDiv
    ] = createElements('div', 4);

    const [
        addProjectButton
    ] = createElements('button', 1);

    addProjectButton.id = 'add_project_button';
    addProjectButton.type = 'button';
    addProjectButton.textContent = 'Add New Project';

    addProjectButton.addEventListener('click', () => {
        let projectDialogWindow = createProjectDialogWindow();
        body.appendChild(projectDialogWindow);
        let createProjectDialog = document.querySelector('#project_dialog_window');
        createProjectDialog.showModal();
        createProjectDialog.addEventListener('cancel', (event) => {
            event.preventDefault();
        })
    })

    projectListDiv.id = 'project_list_div';

    appendAllChildren(sidebarDiv, [sidebarLogo, addNewProjectDiv, projectListDiv]);
    addNewProjectDiv.appendChild(addProjectButton);

    return sidebarDiv;

})();
