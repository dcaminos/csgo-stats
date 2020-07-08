const fs = require("fs");
const readline = require("readline");
const parser = require("./parseMessage");

const FILE_NAME = "./Data/L172_031_041_090_27015_202007051939_000.log";

async function processLineByLine() {
  const fileStream = fs.createReadStream(FILE_NAME);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    parser.parseMessage(`_____${line}_`);
    //console.log(`Line from file: ${line}`);
  }
}

processLineByLine();
