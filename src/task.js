import { createElements, appendAllChildren, setLabelForInput, createTaskObject, deleteTaskFromList, resetValues, setNewMaxHeight, compareTime } from "./utils.js";
import {startOfToday, parseJSON} from "date-fns";


export function createTask(taskList, task, date, start, end, priority) {
    const projectDiv = document.querySelector('#project_div');
    const addNewTask = document.querySelector('div:has(>#add_new_task_button)');
    const taskObject = createTaskObject();
    
    let taskDialogDiv = createTaskDialogDiv(task, taskList)

    taskObject.task = task;
    taskObject.date = parseJSON(date + ' 00:00:00');
    taskObject.start = start;
    taskObject.end = end;
    taskObject.priority = priority;
    taskObject.id = taskList.length;
    addNewTask.before(taskDialogDiv);
    projectDiv.style.maxHeight = setNewMaxHeight(projectDiv, taskDialogDiv, 'add');
    console.log(projectDiv.style.maxHeight);
    taskList.push(taskObject);
}

function createTaskDialogDiv(name, taskList) {
    const projectDiv = document.querySelector('#project_div')
    let [
        taskDiv,
        taskNameDiv
    ] = createElements('div', 2);

    let [
        cancelTaskButton
    ] = createElements('button', 1);

    appendAllChildren(taskDiv, [cancelTaskButton, taskNameDiv]);

    cancelTaskButton.type = 'button';
    cancelTaskButton.textContent = 'X';

    taskNameDiv.textContent = name;
    
    cancelTaskButton.addEventListener('click', () => {
        projectDiv.style.maxHeight = setNewMaxHeight(projectDiv, taskDiv, 'remove');
        setTimeout(() => {
            taskDiv.remove();
        }, 500);
        deleteTaskFromList(name, taskList);
    });

    return taskDiv;
    
}


export function createTaskDiv(taskList) {
    const [
        taskDiv,
        taskNameDiv,
        taskStartDiv,
        taskEndDiv,
        taskDateDiv,
        taskDateAndTimeDiv,
        setAllDayDiv,
        priorityDiv,
        taskCheckboxesDiv,
        taskButtonsDiv
    ] = createElements('div', 10);
    
    const [
        taskNameInput,
        dateInput,
        taskStartInput,
        taskEndInput,
        setAllDayBox,
        priorityBox
    ] = createElements('input', 6);
    
    const [
        dateInputLabel,
        taskStartLabel,
        taskEndLabel,
        setAllDayBoxLabel,
        priorityBoxLabel
    ] = createElements('label', 5);

    const [
        submitTaskButton,
        cancelTaskButton

    ] = createElements('button', 2);

    taskDateAndTimeDiv.id = 'date_and_time_div';

    taskDateDiv.className = 'task_inputs';
    taskStartDiv.className = 'task_inputs';
    taskEndDiv.className = 'task_inputs';
    
    taskNameInput.placeholder = 'Enter task name here...';
    taskNameInput.id = 'task_name_input';
    taskNameInput.maxLength = '80';

    const today = startOfToday();
    dateInput.type = 'date';
    dateInput.value = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    dateInput.min = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    dateInputLabel.textContent = 'Date'

    taskStartInput.type = 'time';
    taskStartInput.value = '06:00';
    taskStartLabel.textContent = 'Start'

    taskEndInput.type = 'time';
    taskEndInput.value = '18:00';
    taskEndInput.min = taskStartInput.value;
    taskEndLabel.textContent= 'End';

    setAllDayBox.type = 'checkbox';
    setAllDayBoxLabel.textContent = 'Set to all day';
    setLabelForInput(setAllDayBox, setAllDayBoxLabel, 'set_all_day_box');

    priorityBox.type = 'checkbox';
    priorityBox.value = false;
    priorityBoxLabel.textContent = 'Set task as important'
    setLabelForInput(priorityBox, priorityBoxLabel, 'priority_box');

    taskCheckboxesDiv.id = 'checkboxes_div';
    taskButtonsDiv.id = 'task_buttons_div';

    submitTaskButton.type = 'button';
    submitTaskButton.textContent = 'Submit';
    submitTaskButton.id = 'submit_task_button';

    cancelTaskButton.type = 'button';
    cancelTaskButton.textContent = 'Cancel';

    // taskDiv.id = 'task_div'
    setLabelForInput(dateInput, dateInputLabel, 'date');
    setLabelForInput(taskStartInput, taskStartLabel, 'task_start');
    setLabelForInput(taskEndInput, taskEndLabel, 'task_end');
    setLabelForInput(setAllDayBox, setAllDayBoxLabel, 'set_all_day');
    setLabelForInput(priorityBox, priorityBoxLabel, 'priority_box');
    appendAllChildren(taskDiv, [taskNameDiv, taskDateAndTimeDiv, taskCheckboxesDiv, taskButtonsDiv]);
    appendAllChildren(taskButtonsDiv, [cancelTaskButton, submitTaskButton]);
    taskNameDiv.appendChild(taskNameInput);
    appendAllChildren(taskDateAndTimeDiv, [taskDateDiv, taskStartDiv, taskEndDiv]);
    appendAllChildren(taskDateDiv, [dateInput, dateInputLabel]);
    appendAllChildren(taskStartDiv, [taskStartInput, taskStartLabel]);
    appendAllChildren(taskEndDiv, [taskEndInput, taskEndLabel]);
    appendAllChildren(setAllDayDiv, [setAllDayBox, setAllDayBoxLabel]);
    appendAllChildren(priorityDiv, [priorityBox, priorityBoxLabel]);
    appendAllChildren(taskCheckboxesDiv, [setAllDayDiv, priorityDiv]);

    setAllDayBox.addEventListener('change', () => {
        if (setAllDayBox.checked == true) {
            taskStartInput.readOnly = true;
            taskEndInput.readOnly = true;
            taskStartInput.value = '00:00';
            taskEndInput.value = '23:59';
        } else {
            taskStartInput.readOnly = false;
            taskEndInput.readOnly = false;
        }
    });

    priorityBox.addEventListener('change', () => {
        if (priorityBox.checked == true) {
            priorityBox.value = true;
        } else {
            priorityBox.value = false;
        }
    });

    submitTaskButton.addEventListener('click', () => {
        
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

        console.log(taskList)
    });

    cancelTaskButton.addEventListener('click', () => {
        const projectDiv = document.querySelector('#project_div');
        projectDiv.style.maxHeight = '127px';
        setTimeout(() => {
            taskNameInput.value = '';
            taskStartInput.value = '06:00';
            taskEndInput.value = '18:00';
        }, 500)

    } )

    return taskDiv;
};