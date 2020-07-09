const path = require("path");
const fs = require("fs");
const readline = require("readline");
const parser = require("./parseline");
const session = require("./session");

async function main(args) {
  try {
    const directory = getDirectory(args);
    const files = fs.readdirSync(directory, { withFileTypes: true });
    readFiles(directory, files);
  } catch (error) {
    console.log(error);
  }
  return;
}

const getDirectory = (args) => {
  if (args.length === 0) {
    throw "Missing path.";
  }

  return args[0];
};

async function readFiles(directory, files) {
  if (files.length === 0) {
    return;
  }

  let startTime = 0;
  files
    .filter((file) => file.isFile())
    .forEach(async (file) => {
      setTimeout(async function () {
        console.log("SEND FILE: ", file.name);
        const fileStream = fs.createReadStream(directory + file.name);

        const rl = readline.createInterface({
          input: fileStream,
          crlfDelay: Infinity,
        });

        for await (const line of rl) {
          parseMessage(line);
        }
      }, startTime);
      startTime += 1000;
    });
}

const parseMessage = (message) => {
  const msg = message.toString("ascii").trim();
  const ev = parser.parseLine(msg);

  if (ev !== null) {
    if (session[ev.type] !== undefined) {
      session[ev.type](ev);
    }
  }
};

main(process.argv.slice(2));
