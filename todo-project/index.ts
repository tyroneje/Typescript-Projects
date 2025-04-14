import * as Commander from "commander";

let program = new Commander.Command();
program.version('1.0.0');

program.command('add <task>')
.description('Add Task to file')
.action((task) => {
    console.log(task);
  })

program.parse(process.argv);