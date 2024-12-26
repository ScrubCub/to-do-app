import { appendAllChildren, createElements } from "./utils";
import { createProjectDialogWindow } from "./project.js";
import logo from "./logos/logo.png";


const body = document.querySelector('body');


export default (function() {
    const [
        sidebarDiv,
        sidebarLogoDiv,
        addNewProjectDiv,
        projectListDiv
    ] = createElements('div', 4);

    const [
        addProjectButton
    ] = createElements('button', 1);

    const [
        sidebarLogo
    ] = createElements('img', 1);

    const [
        sidebarLogoName
    ] = createElements('p', 1);

    sidebarDiv.id = 'sidebar_div';

    sidebarLogo.src = logo;
    sidebarLogo.id = 'sidebar_logo';
    sidebarLogoName.textContent = 'To-do App';
    sidebarLogoDiv.id = 'sidebar_logo_div';
    appendAllChildren(sidebarLogoDiv, [sidebarLogo, sidebarLogoName]);

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
    appendAllChildren(sidebarDiv, [sidebarLogoDiv, addNewProjectDiv, projectListDiv]);
    addNewProjectDiv.appendChild(addProjectButton);

    return sidebarDiv;

})();
