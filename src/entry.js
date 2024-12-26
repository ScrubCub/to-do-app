import projectDialogWindow from "./project.js";
import { appendAllChildren, createElements } from "./utils.js";
import {createContentDiv} from "./content.js";
import sidebarDiv from "./sidebar.js";
import "./stylesheet.css"

export const globalProjectList = [];

const body = document.querySelector('body');

let homepageDiv = document.createElement('div');
// let contentDiv = document.createElement('div');

homepageDiv.appendChild(sidebarDiv);
homepageDiv.appendChild(createContentDiv())

body.appendChild(homepageDiv);
// homepageDiv.appendChild(contentDiv);




// body.appendChild(projectDialogWindow);
// let projectDialogWindowPointer = document.querySelector('#project_dialog_window');
