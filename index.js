const { getAllFilePathsWithExtension, readFile } = require('./fileSystem');
const { readLine } = require('./console');

const files = getFiles();
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
            console.log(GetToDo(files));
            break;
        case 'important':
            ShowImportantToDo(files);
            break;
        case 'user':
            ShowUserToDo(files, command.substring(5));
            break;
        default:
            console.log('wrong command');
            break;
    }
}

// TODO you can do it!
function GetToDo(files) {
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

function ShowImportantToDo(files) {
    let todo = GetToDo(files);
    for (const todoElement of todo) {
        if (todoElement.includes('!')) {
            console.log(todoElement)
        }
    }
}

function ShowUserToDo(files, username) {
    let todos = GetToDo(files);
    let targetUser = username.toLowerCase();
    for (const todo of todos) {
        let parts = todo.split(';');
        if (parts.length > 1) {
            let author = parts[0].split('TODO')[1].trim().toLowerCase();
            if (author === targetUser) {
                console.log(todo);
            }
        }
    }
}

