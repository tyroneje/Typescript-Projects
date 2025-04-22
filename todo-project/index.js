"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var process_1 = require("process");
var readline = require("readline");
var line = readline.createInterface({
    input: process_1.stdin,
    output: process_1.stdout,
});
var tasks = [];
line.setPrompt("Welcome to your To Do List. what would you like to do:\n  1 - add task\n  2 - remove task\n  3 - list task\n  4 - save to file\n  5 - open task file\n  6 - end application\n  ");
line.prompt();
line
    .on("line", function (input) {
    console.log("Received: ".concat(input));
    switch (parseInt(input)) {
        case 1:
            break;
        case 2:
            RemoveTask();
            break;
        case 3:
            tasks.forEach(function (x, idx) { return console.log("".concat(idx, " - ").concat(x)); });
            break;
        case 4:
            console.log("save your file");
            break;
        case 5:
            console.log("open saved task");
            break;
        case 6:
            console.log("closing app!!");
            line.close();
            break;
        default:
            console.log("What are you doing bro!");
            break;
    }
    console.log();
    line.prompt();
})
    .on("close", function (input) {
    process.exit(0);
});
function AddTask() {
    line.question("Task:", function (task) {
        tasks.push(task);
    });
}
function RemoveTask() {
    line.question("Which task do you want to remove? ", function (taskNum) {
        tasks.splice(parseInt(taskNum), 1);
        tasks.forEach(function (x, idx) { return console.log("".concat(idx, " - ").concat(x)); });
    });
}
/*let program = new Commander.Command();
program.version('1.0.0');

program.command('add <task>')
.description('Add Task to file')
.action((task) => {
    console.log(task);
  })

program.parse(process.argv);*/
/*line.question(
    `Welcome to your To Do List. what would you like to do:
  1 - add task
  2 - remove task
  6 - end application`,
    (answer) => {
      switch (parseInt(answer)) {
        case 1:
          console.log("add task");
          break;
        case 2:
          console.log("remove task");
          break;
        case 6:
          exist = false;
          line.close();
          console.log("closing app!!");
          break;
        default:
          console.log("What are you doing bro!");
          break;
      }
    }
  );*/
