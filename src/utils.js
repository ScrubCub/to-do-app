export function createElements(type, amount) {
    let elements = [];
    for (let i = 0; i < amount; i++) {
        elements.push(document.createElement(type));
    }

    return elements;
};

export function setAllAttributes(element, attributes, values) {
    for (let i = 0; i < attributes.length; i++) {
        element.setAttribute(attributes[i], values[i]);
    }
};

export function appendAllChildren(parent, children) {
    children.forEach((child) => {
        parent.appendChild(child);
    })
};

export function setLabelForInput(input, label, id) {
    input.id = id;
    label.setAttribute('for', id);
}

export function createProjectObject(title, description, tasks) {
    let projectObject = {
        title: title,
        description: description,
        tasks: tasks
    };

    return projectObject;
};

export function createTaskObject(task, date, start, end, priority, projectParent, completed = false) {
    let taskObject = {
        task: task,
        date: date,
        start: start,
        end: end,
        priority: priority,
        parent: projectParent,
        completed: completed
    }

    return taskObject;
};

export function updateTaskProjectParent(parentName, tasks) {
    tasks.forEach((taskObject) => {
        taskObject.parent = parentName;
    })
};

export function deleteProjectFromList(name, globalProjectList) {
    globalProjectList.removeItem(name);

};

export function deleteTaskFromList(task, taskList) {
    let taskIndex = taskList.findIndex((taskObject) => {
        return taskObject.task == task
    });

    taskList.splice(taskIndex, 1);
}

export function checkProjectExistence(projectName, globalProjectList) {

    for (let i = 0; i < globalProjectList.length; i++) {
        ;
        if (JSON.parse(globalProjectList.getItem(`${projectName}`)) != null) {
            return true;
        } 
    }

    return false;
}

export function resetValues(inputs) {
    inputs.forEach((elem) => {
        elem.value = '';
    })
}

export function setNewMaxHeight(parentDiv, childDiv, mode = 'add') {
    let currentParentHeight = Number(parentDiv.getAttribute('style').slice(12, -3));
    let currentChildHeight = Number(childDiv.offsetHeight);

    if (mode == 'add') {
        return (`${currentParentHeight - 113 + currentChildHeight}px`);
    } else if (mode == 'remove') {
        currentParentHeight = parentDiv.offsetHeight;
        return (`${currentParentHeight - currentChildHeight}px`)
    }

}

export function createDayDivs(amount) {
    const divs = [];
    for (let i = 0; i < amount; i++) {
        let day = document.createElement('div');
        day.id = `day_${i+1}`;
        day.className = 'day_divs';
        divs.push(day);
    }
    return divs;
}

export function nameDaysOfTheWeek(list) {
    list[0].textContent = 'Sunday';
    list[1].textContent = 'Monday';
    list[2].textContent = 'Tuesday';
    list[3].textContent = 'Wednesday';
    list[4].textContent = 'Thursday';
    list[5].textContent = 'Friday';
    list[6].textContent = 'Saturday';

}

export function compareTime(start, end) {
    let splitStart = start.split(':');
    let splitEnd = end.split(':');

    if (Number(splitEnd[0]) < Number(splitStart[0])) {
        return true;
    }

    return false;
}

export function updateProjectList(globalProjectList, projectObject) {
    globalProjectList.setItem(`${projectObject.title}`, JSON.stringify(projectObject));
}