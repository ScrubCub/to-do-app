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
    label.for = id;
}

export function createProjectObject(title, description, tasks) {
    let projectObject = {
        title: title,
        description: description,
        tasks: tasks
    };

    return projectObject;
};

export function createTaskObject(task, start, end, priority, projectParent) {
    let taskObject = {
        task: task,
        start: start,
        end: end,
        priority: priority,
        parent: projectParent
    }

    return taskObject;
};

export function updateTaskProjectParent(parentName, tasks) {
    tasks.forEach((taskObject) => {
        taskObject.parent = parentName;
    })
}