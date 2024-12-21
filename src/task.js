import { createElements, appendAllChildren, setLabelForInput } from "./utils.js";

export default (function createTaskDialogWindow() {
    const [
        taskDiv,
        taskNameDiv,
        taskTimesDiv,
        taskCheckboxesDiv
    ] = createElements('div', 4);
    
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
    
    const taskDialogWindow = document.createElement('dialog');
    taskDialogWindow.id = 'task_dialog_window';

    taskNameInput.placeholder = 'Enter task name here...';
    taskNameInput.id = 'task_name_input';

    taskStartInput.type = 'time';
    taskStartInput.value = '06:00';

    taskEndInput.type = 'time';
    taskEndInput.value = '18:00';

    setAllDayBox.type = 'checkbox';
    setAllDayBoxLabel.textContent = 'Set to all day';

    priorityBox.type = 'checkbox';
    priorityBoxLabel.textContent = 'Set task as important'

    let submitTaskButton = document.createElement('button');
    submitTaskButton.type = 'button';
    submitTaskButton.textContent = 'Submit'
    
    setLabelForInput(taskStartInput, taskStartLabel, 'task_start');
    setLabelForInput(taskEndInput, taskEndLabel, 'task_end');
    setLabelForInput(setAllDayBox, setAllDayBoxLabel, 'set_all_day');
    setLabelForInput(priorityBox, priorityBoxLabel, 'priority_box');
    taskDialogWindow.appendChild(taskDiv);
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

    return taskDialogWindow;
})();