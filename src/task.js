import { createElements, appendAllChildren, setLabelForInput, createTaskObject } from "./utils.js";

export function createTaskDiv(taskList) {
    const [
        taskDiv,
        taskNameDiv,
        taskTimesDiv,
        taskCheckboxesDiv,
        finalTaskName
    ] = createElements('div', 5);
    
    const [
        taskNameInput,
        taskStartInput,
        taskEndInput,
        setAllDayBox,
        priorityBox
    ] = createElements('input', 5);
    
    const [
        taskStartLabel,
        taskEndLabel,
        setAllDayBoxLabel,
        priorityBoxLabel
    ] = createElements('label', 4);
    
    taskNameInput.placeholder = 'Enter task name here...';
    taskNameInput.id = 'task_name_input';

    taskStartInput.type = 'time';
    taskStartInput.value = '06:00';

    taskEndInput.type = 'time';
    taskEndInput.value = '18:00';

    setAllDayBox.type = 'checkbox';
    setAllDayBoxLabel.textContent = 'Set to all day';

    priorityBox.type = 'checkbox';
    priorityBox.value = false;
    priorityBoxLabel.textContent = 'Set task as important'

    const submitTaskButton = document.createElement('button');
    submitTaskButton.type = 'button';
    submitTaskButton.textContent = 'Submit'
    
    setLabelForInput(taskStartInput, taskStartLabel, 'task_start');
    setLabelForInput(taskEndInput, taskEndLabel, 'task_end');
    setLabelForInput(setAllDayBox, setAllDayBoxLabel, 'set_all_day');
    setLabelForInput(priorityBox, priorityBoxLabel, 'priority_box');
    appendAllChildren(taskDiv, [taskNameDiv, taskTimesDiv, taskCheckboxesDiv, submitTaskButton]);
    taskNameDiv.appendChild(taskNameInput);
    appendAllChildren(taskTimesDiv, [taskStartInput, taskEndInput, taskStartLabel, taskEndLabel]);
    appendAllChildren(taskCheckboxesDiv, [setAllDayBox, setAllDayBoxLabel, priorityBox, priorityBoxLabel]);

    setAllDayBox.addEventListener('change', () => {
        if (setAllDayBox.checked == true) {
            taskStartInput.value = '00:00';
            taskEndInput.value = '23:59';
            taskStartInput.readOnly = true;
            taskEndInput.readOnly = true;
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
        let projectDescInput = document.querySelector('#project_desc_input');
        let task = taskNameInput.value;
        let start = taskStartInput.value;
        let end = taskEndInput.value;
        let priority = priorityBox.value;
        finalTaskName.textContent = task;
        const taskObject = createTaskObject(task, start, end, priority);
        taskList.push(taskObject);
        taskDiv.remove();
        projectDescInput.after(finalTaskName);
    })

    return taskDiv;
};