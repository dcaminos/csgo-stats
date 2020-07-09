//const proccesMatch = require("./proccesMatch");
const parser = require("./parseline");
const session = require("./session");
const firestore = require("./firestore");
/**
 * @typedef {import('./types.js').ServerEvent} ServerEvent
 */

const parseMessage = (message) => {
  const msg = message.toString("ascii").slice(5, -1).trim();
  const ev = parser.parseLine(msg);

  if (ev !== null) {
    if (session[ev.type] !== undefined) {
      session[ev.type](ev);
    } /*else {
      if (!["killedother"].includes(ev.type)) {
        console.log(ev);
      }
    }*/
  }
};

//Export parseLine function and rgx object
module.exports = {
  parseMessage: parseMessage,
};
