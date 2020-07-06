const proccesMatch = require("./proccesMatch");

/**
 * @typedef {import('./types.js').ServerEvent} ServerEvent
 */

const eventTypes = [
  "matchstart",
  "enteredgame",
  "switchedteam",
  "roundstart",
  "roundend",
  "kill",
  "assist",
  "teamtriggered",
  "playertriggered",
  "gameover",
];
let events = [];

const parseMessage = (message) => {
  //Trim non-standard log line characters and whitespace
  var msg = message.toString("ascii").slice(5, -1).trim();

  //Parse log line
  /**
   * @type {ServerEvent}
   */
  var ev = parser.parseLine(msg);

  if (ev) {
    if (eventTypes.includes(ev.type)) {
      if (ev.type === "matchstart") {
        events = [ev];
      } else if (ev.type === "gameover") {
        events.push(ev);
        proccesMatch(events);
      } else {
        events.push(ev);
      }
    }
  }

  //Send out event created by log line
};

//Export parseLine function and rgx object
module.exports = {
  parseMessage: parseMessage,
};
