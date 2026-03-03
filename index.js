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
    let result = [];
    for (const file of files) {
        let split = file.split('// ' + 'TODO');
        for (let i = 1; i < split.length; i++) {
            for (let j = 0; j < split[i].length; j++) {
                if (split[i][j] === '\n') {
                    let todo = '// ' + 'TODO' + split[i].substring(0, j - 1);
                    result.push(todo);
                    break;
                }
            }
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