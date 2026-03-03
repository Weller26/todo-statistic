const { getAllFilePathsWithExtension, readFile } = require('./fileSystem');
const { readLine } = require('./console');

const files = getFiles();
const todo = getToDo(files);
console.log('Please, write your command!');
readLine(processCommand);

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function processCommand(command) {
    switch (command.split(' ')[0]) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            console.log(todo);
            break;
        case 'important':
            ShowImportantToDo(todo);
            break;
        case 'user':
            ShowUserToDo(todo, command.substring(5));
            break;
        case 'date':
            ShowDataToDo(todo, command.substring(5));
            break;

        default:
            console.log('wrong command');
            break;
    }
}

// TODO you can do it!

function getToDo(files) {
    const result = [];
    const todoRegex = /\/\/\s*todo.*/gi;
    for (const file of files) {
        const matches = file.match(todoRegex);
        if (matches) {
            result.push(...matches);
        }
    }
    return result;
}

function ShowImportantToDo(todo) {
    for (const todoElement of todo) {
        if (todoElement.includes('!')) {
            console.log(todoElement)
        }
    }
}

function ShowUserToDo(todo, username) {
    let targetUser = username.toLowerCase();
    for (const todoElem of todo) {
        let parts = todoElem.split(';');
        if (parts.length > 1) {
            let author = parts[0].split('TODO')[1].trim().toLowerCase();
            if (author === targetUser) {
                console.log(todoElem);
            }
        }
    }
}

function ShowDataToDo(todo, date) {
    for (const todoElement of todo) {
        const parts = todoElement.split(';');
        if (parts.length > 1) {
            const todoDate = parts[1].trim();
            if (todoDate >= date) {
                console.log(todoElement);
            }
        }
    }
}

function CheckImportant(todo) {
    for (const todoElement of todo) {
        if (todoElement.includes('!')) {
            return true;
        }
    }
    return false;
}



function ShowTable(todo) {
}



