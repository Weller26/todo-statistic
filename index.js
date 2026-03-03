const {getAllFilePathsWithExtension, readFile} = require('./fileSystem');
const {readLine} = require('./console');

const files = getFiles();
console.log('Please, write your command!');
readLine(processCommand);

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function processCommand(command) {
    switch (command) {
        case 'exit':
            process.exit(0);
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
        let split = file.split('// TODO');
        for (let i = 1; i < split.length; i++) {
            for (let j = 0; j < split[i].length; j++) {
                if (split[i][j] === '\n') {
                    let todo = '// TODO' + split[i].substring(0, j - 1);
                    result.push(todo);
                    break;
                }
            }
        }
    }
    return result.splice(0, result.length - 2);
}
