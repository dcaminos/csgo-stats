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

  const _files = files.filter((file) => file.isFile());

  for await (const file of _files) {
    const fileStream = fs.createReadStream(directory + file.name);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      await parseMessage(line);
    }
  }
}

const parseMessage = async (message) => {
  const msg = message.toString("ascii").trim();
  const ev = parser.parseLine(msg);

  if (ev !== null) {
    if (session[ev.type] !== undefined) {
      await session[ev.type](ev, true);
    }
  }
};

main(process.argv.slice(2));
