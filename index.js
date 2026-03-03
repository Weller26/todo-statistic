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
        case 'sort':
            sortTodo(command.substring(5));
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
    const todoRegex = /\/\/\s*todo\b.*/gi;
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

function GetExclamationMarkCount(todo) {
    let counter = 0;
    for (const todoElement of todo) {
        if (todoElement.includes('!')) {
            counter++;
        }
    }
}

function sortTodo(key) {
    switch (key) {
        case 'importance':
            ShowTodoByImportance(todo);
            break;
        case 'user':
            ShowTodoByUser(todo);
            break;
        case 'date':
            ShowTodoByDate(todo);
            break;
    }
}

function ShowTodoByImportance(todo) {
    let importances = GetImportancesArr(todo);
    let sortImportances = importances.sort(function (a, b) {
        return b[1] - a[1];
    });
    for (const importance of sortImportances) {
        console.log(todo[importance[0]])
    }
}

function GetImportancesArr(todo) {
    let result = [];
    for (let i = 0; i < todo.length; i++) {
        let tuple = [i, 0];
        result.push(tuple);
        for (let j = 0; j < todo[i].length; j++) {
            if (todo[i][j] === '!') {
                result[i][1]++;
            }
        }
    }
    return result;
}

function ShowTodoByUser(todo) {
    let users = GetUsersArr(todo);
    let sortUsers = users.sort(function (a, b) {
        if (!a[1] && !b[1]) return 0;
        if (!a[1]) return 1;
        if (!b[1]) return -1;
        return a[1].localeCompare(b[1]);
    });
    for (const user of sortUsers) {
        console.log(user[0])
    }
}

function GetUsersArr(todo) {
    let result = [];
    for (const todoElem of todo) {
        let tuple = [todoElem, '']
        result.push(tuple);
        let parts = todoElem.split(';');
        if (parts.length > 1) {
            let author = parts[0].split('TODO')[1].trim().toLowerCase();
            result[result.length - 1][1] = author;
        }
    }
    return result;
}

function ShowTodoByDate(todo) {
    let dates = getDatesArr(todo);
    let sortDates = dates.sort(function (a, b) {
        if (!a[1] && !b[1]) return 0;
        if (!a[1]) return 1;
        if (!b[1]) return -1;
        return b[1].localeCompare(a[1]);
    });
    for (const sortDate of sortDates) {
        console.log(sortDate[0])
    }
}

function getDatesArr(todo) {
    let result = [];
    for (const todoElement of todo) {
        let tuple = [todoElement, '']
        result.push(tuple);
        const parts = todoElement.split(';');
        if (parts.length > 1) {
            const todoDate = parts[1].trim();
            result[result.length - 1][1] = todoDate;
        }
    }
    return result;
}