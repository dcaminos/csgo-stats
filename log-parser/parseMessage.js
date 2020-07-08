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
    } else {
      if (!["killedother"].includes(ev.type)) {
        console.log(ev);
      }
    }
  }
};
/*
const proccesMatch = (events) => {
  const matchData = initMatch(events[0], events[events.length - 1]);
  events.forEach((ev) => {
    if (ev.type === "roundend") {
      proccesRoundend(matchData, ev);
    } else if (ev.type === "kill") {
      proccesKill(matchData, ev);
    } else if (ev.type === "assist") {
      proccesAssist(matchData, ev);
    } else if (ev.type === "damage") {
      proccesDamage(matchData, ev);
    } else if (ev.type === "playertriggered") {
      proccesPlayerTriggered(matchData, ev);
    } else if (
      ev.type === "killedother" ||
      ev.type === "throw" ||
      ev.type === "switchedteam" ||
      ev.type === "enteredgame"
    ) {
      proccesSource(matchData, ev);
    } else if (ev.type === "flashed") {
      proccesSourceAndTarget(matchData, ev);
    } else if (ev.type === "say" || ev.type === "sayteam") {
      proccesChat(matchData, ev);
    } else {
      console.log(ev);
    }
  });

  return matchData;
};*/

//Export parseLine function and rgx object
module.exports = {
  parseMessage: parseMessage,
};
