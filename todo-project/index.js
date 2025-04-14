"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Commander = require("commander");
var program = new Commander.Command();
program.version('1.0.0');
program.command('add <task>')
    .description('Add Task to file')
    .action(function (task) {
    console.log(task);
});
program.parse(process.argv);
