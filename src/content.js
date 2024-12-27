import { startOfToday, getDaysInMonth, startOfMonth } from 'date-fns';
import { addDateToDiv, appendAllChildren, createDayDivs, createElements, nameDaysOfTheWeek, updateProjectList, getDayDivs } from './utils.js';
import { globalProjectList } from './entry.js';

let today = startOfToday();
let numberOfDaysInMonth = getDaysInMonth(today);

export function createContentDiv() {
    
    let dateOfToday = today.getDate(); // 1 - 31
    let dayOfToday = today.getDay(); // 0 - 6 (Sunday - Saturday)
    let monthOfToday = today.getMonth(); // 0 - 11 (Jan - Dec)
    let yearOfToday = today.getFullYear(); // YYYY
    const days = createDayDivs(numberOfDaysInMonth);
    let firstDay = days[0];
    let startOfMonthDate = Number(startOfMonth(today).getDay()) + 1;

    addDateToDiv(days);

    const [
        contentDiv,
        daysDiv,
        dateHeaders
    ] = createElements('div', 3);

    const daysOfTheWeek = createElements('div', 7);
    nameDaysOfTheWeek(daysOfTheWeek);
    daysOfTheWeek.forEach((day) => {
        day.className = 'days_of_the_week';
    });
    

    contentDiv.id = 'content_div';
    daysDiv.id = 'day_divs_parent';
    dateHeaders.id = 'date_headers';

    appendAllChildren(dateHeaders, daysOfTheWeek);
    appendAllChildren(daysDiv, days);
    appendAllChildren(contentDiv, [dateHeaders, daysDiv]);
    
    firstDay.style.gridColumnStart = startOfMonthDate;

    return contentDiv;
};

export function showAllTasksOfProject(projectObject) {
    let tasks = projectObject.tasks;
    let taskList = {};

    tasks.forEach((currentTask) => {
        let taskDate = new Date(currentTask.date);
        if (!taskList.hasOwnProperty(taskDate.getDate())) {
            let property = taskDate.getDate();
            taskList[`${property}`] = [];
            taskList[`${property}`].push(currentTask);
        } else {
            let property = taskDate.getDate();
            taskList[`${property}`].push(currentTask);
        }
    })
    return taskList;
}

export function populateContentWithTasks(taskList, projectObject) {
    let taskDates = Object.getOwnPropertyNames(taskList);
    let contentDiv = document.querySelector('body > div > div:last-child');
    contentDiv.replaceWith(createContentDiv());
    

    taskDates.forEach((date) => {
        let dateDiv = document.querySelector(`#day_${date}`);
        console.log(dateDiv);
        let tasksOfTheDay = [];
        let day = document.createElement('p');

        day.textContent = `${date}`;
        dateDiv.replaceChildren();
        dateDiv.appendChild(day);

        taskList[`${date}`].forEach((task) => {
            let taskDiv = document.createElement('p');
            taskDiv.textContent = task.task;
            dateDiv.appendChild(taskDiv);
            tasksOfTheDay.push(task);
        })

        dateDiv.addEventListener('click', () => {
            showTasksFull(tasksOfTheDay, taskList, projectObject);
        })
    })
}

function showTasksFull(tasksOfTheDay, taskList, projectObject) {
    let contentDiv = document.getElementById('content_div');

    const [
        importantTasksDiv,
        otherTasksDiv,
        fullTaskDiv
    ] = createElements('div', 3);

    const [
        noImportantTasks,
        noOtherTasks
    ] = createElements('p', 2);

    fullTaskDiv.id = 'full_task_div';

    noImportantTasks.textContent = 'No tasks set.';
    noOtherTasks.textContent = 'No tasks set.';

    const exitButton = document.createElement('button');
    exitButton.type = 'button';
    exitButton.textContent = 'X';

    exitButton.addEventListener('click', () => {
        fullTaskDiv.replaceWith(createContentDiv());
        populateContentWithTasks(taskList, projectObject);
    })

    importantTasksDiv.textContent = 'Important Tasks: ';
    importantTasksDiv.id = 'important_tasks_div';
    otherTasksDiv.textContent = 'Other tasks: ';
    otherTasksDiv.id = 'other_tasks_div';



    tasksOfTheDay.forEach((task) => {
        let [
            taskDiv
        ] = createElements('div', 1);

        taskDiv.className = 'task_details';

        let [
            nameHeader,
            startHeader,
            endHeader,
            completedHeader,
            name,
            start,
            end,
        ] = createElements('p', 7);

        const completedCheckbox = document.createElement('input');
        completedCheckbox.type = 'checkbox';

        name.textContent = task.task;
        name.className = 'detail'
        start.textContent = task.start;
        start.className = 'detail';
        end.textContent = task.end;
        end.className = 'detail';
        nameHeader.textContent = 'Task';
        nameHeader.className = 'task_headers';
        startHeader.textContent = 'Time start';
        startHeader.className = 'task_headers'
        endHeader.textContent = 'Time end';
        endHeader.className = 'task_headers'
        completedHeader.textContent = 'Completed';
        completedHeader.className = 'task_headers';

        if (task.completed == true) {
            completedCheckbox.checked = true;
            name.className = 'detail_done';
            start.className = 'detail_done';
            end.className = 'detail_done';
    }

        completedCheckbox.addEventListener('change', () => {
            if (completedCheckbox.checked == true) {
                name.className = 'detail_done';
                start.className = 'detail_done';
                end.className = 'detail_done';
                task.completed = true;
                updateProjectList(globalProjectList, projectObject)
                return
            }

            name.className = 'detail';
            start.className = 'detail';
            end.className = 'detail';
            task.completed = false;
            updateProjectList(globalProjectList, projectObject)
        })

        appendAllChildren(taskDiv, [nameHeader, startHeader, endHeader, completedHeader, name, start, end, completedCheckbox]);
        
        if (task.priority == 'true') {
            importantTasksDiv.appendChild(taskDiv);

        } else {
            otherTasksDiv.appendChild(taskDiv);
        }

        

        appendAllChildren(fullTaskDiv, [exitButton, importantTasksDiv, otherTasksDiv]);


    })

    if (!(importantTasksDiv.childElementCount > 0)) {
        importantTasksDiv.appendChild(noImportantTasks);
    }

    if (!(otherTasksDiv.childElementCount > 0)) {
        otherTasksDiv.appendChild(noOtherTasks);
    }

    contentDiv.replaceWith(fullTaskDiv);

}