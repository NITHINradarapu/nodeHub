const yargs = require("yargs"); // Helps parse command-line arguments

const { hideBin } = require("yargs/helpers"); // Cleans up Node’s default arguments so yargs only sees what you typed

const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add");
const {commitRepo} = require("./controllers/commit");
const {pullRepo} = require("./controllers/pull");
const {pushRepo} = require("./controllers/push");
const {revertRepo} = require("./controllers/revert");
yargs(hideBin(process.argv)) // This starts configuring your CLI tool.
  .command("init", "-> Initialize new Repository", {}, initRepo)
  .command(
    "add <file>",
    "-> Add a file to the Repository",
    (yargs) => {
      yargs.positional("file", {
        describe: "File to be added to staging area",
        type: "string",
      });
    },
    addRepo,
  )
  .command(
    "commit <message>",
    "-> Commit the stagged file",
    (yargs) => {
        yargs.positional("message", {
        describe: "Commit message",
        type: "string",
      });
    },
    commitRepo
  )
  .command("push", "-> push commits to S3", {}, pushRepo)
  .command("pull", "-> pull commits from S3", {}, pullRepo)
  .command("revert <commitID>", "-> revert a commit", (yargs) => {
    yargs.positional("commitID", {
        describe: "File to be reverted",
        type: "string"
    })
  }, revertRepo)
  .demandCommand(1, "You need atleast one command")
  .help()
  .argv; // This tells yargs to parse and execute the command
