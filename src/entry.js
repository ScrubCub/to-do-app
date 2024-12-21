import projectDialogWindow from "./project.js";
import { appendAllChildren, createElements } from "./utils.js";
import sidebarDiv from "./sidebar.js";
import "./stylesheet.css"

export const globalProjectList = [];

const body = document.querySelector('body');

let homepageDiv = document.createElement('div');
homepageDiv.appendChild(sidebarDiv);

body.appendChild(homepageDiv);




// body.appendChild(projectDialogWindow);
// let projectDialogWindowPointer = document.querySelector('#project_dialog_window');
