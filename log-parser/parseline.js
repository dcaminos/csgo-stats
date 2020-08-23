// @ts-check
const rgx = require("./regex");

/**
 * @typedef {import('./types.js').ServerEvent} ServerEvent
 * @typedef {import('./types.js').ServerEventDataPlayer} ServerEventDataPlayer
 * @typedef {import('./types.js').Get5Event} Get5Event
 */

/**
 * Takes in a log line, tests it against all regexs, returns data in event format
 * @param {string} line -
 * @returns {string} steamId
 */
const parseSteamId = (line) => {
  const words = line.split(":");
  if (words.length > 1) {
    return words[words.length - 1];
  }
  return line;
};

/**
 * Takes in a log line, tests it against all regexs, returns data in event format
 * @param {string} line -
 * @returns {ServerEvent} Event for given log line
 */
const parseLine = (line) => {
  /**
   * @type {ServerEvent}
   */
  let ev = {
    type: null,
    data: {
      date: null,
      time: null,
    },
  };
  let match = [];

  switch (true) {
    case rgx.attacked.test(line):
      match = line.match(rgx.attacked);
      ev.type = "damage";
      ev.data.date = match[1];
      ev.data.time = match[2];
      ev.data.source = {
        name: match[3],
        steam: parseSteamId(match[4]),
        team: match[5],
        coord: match[6],
      };
      ev.data.target = {
        name: match[7],
        steam: parseSteamId(match[8]),
        team: match[9],
        coord: match[10],
      };
      ev.data.weapon = match[11];
      ev.data.health = {
        dealt: parseInt(match[12], 10),
        left: parseInt(match[14], 10),
      };
      ev.data.armour = {
        dealt: parseInt(match[13], 10),
        left: parseInt(match[15], 10),
      };
      ev.data.hitgroup = match[16];
      break;

    case rgx.killed.test(line):
      match = line.match(rgx.killed);
      ev.type = "kill";
      ev.data.date = match[1];
      ev.data.time = match[2];
      ev.data.source = {
        name: match[3],
        steam: parseSteamId(match[4]),
        team: match[5],
        coord: match[6],
      };
      ev.data.target = {
        name: match[7],
        steam: parseSteamId(match[8]),
        team: match[9],
        coord: match[10],
      };
      ev.data.weapon = match[11];
      const flags = match[12] ? match[12].split(" ") : [];
      ev.data.headshot = flags.indexOf("headshot") > -1;
      ev.data.penetrated = flags.indexOf("penetrated") > -1;
      ev.data.noscope = flags.indexOf("noscope") > -1;
      ev.data.attackerblind = flags.indexOf("attackerblind") > -1;
      ev.data.throughsmoke = flags.indexOf("throughsmoke") > -1;
      break;

    case rgx.assist.test(line):
      match = line.match(rgx.assist);
      ev.type = "assist";
      ev.data.date = match[1];
      ev.data.time = match[2];
      ev.data.source = {
        name: match[3],
        steam: parseSteamId(match[4]),
        team: match[5],
      };
      ev.data.target = {
        name: match[6],
        steam: parseSteamId(match[7]),
        team: match[8],
      };
      break;

    case rgx.flashAssist.test(line):
      match = line.match(rgx.flashAssist);
      ev.type = "flashassist";
      ev.data.date = match[1];
      ev.data.time = match[2];
      ev.data.source = {
        name: match[3],
        steam: parseSteamId(match[4]),
        team: match[5],
      };
      ev.data.target = {
        name: match[6],
        steam: parseSteamId(match[7]),
        team: match[8],
      };
      break;

    case rgx.flashed.test(line):
      match = line.match(rgx.flashed);
      ev.type = "flashed";
      ev.data.date = match[1];
      ev.data.time = match[2];
      ev.data.source = {
        name: match[7],
        steam: parseSteamId(match[8]),
        team: match[9],
      };
      ev.data.target = {
        name: match[3],
        steam: parseSteamId(match[4]),
        team: match[5],
      };
      ev.data.duration = match[6];
      ev.data.entindex = match[10];
      break;

    case rgx.threw.test(line):
      match = line.match(rgx.threw);
      ev.type = "throw";
      ev.data.date = match[1];
      ev.data.time = match[2];
      ev.data.source = {
        name: match[3],
        steam: parseSteamId(match[4]),
        team: match[5],
      };
      ev.data.grenade = {
        type: match[6],
        coord: match[7],
      };
      match[8] ? (ev.data.entindex = match[8]) : "";
      break;

    case rgx.projectile.test(line):
      match = line.match(rgx.projectile);
      ev.type = "projectile";
      ev.data.date = match[1];
      ev.data.time = match[2];
      ev.data.projectile = {
        coord: match[3],
        velocity: match[4],
      };
      break;

    case rgx.buy.test(line):
      match = line.match(rgx.buy);
      ev.type = "purchased";
      ev.data.date = match[1];
      ev.data.time = match[2];
      ev.data.source = {
        name: match[3],
        steam: parseSteamId(match[4]),
        team: match[5],
      };
      ev.data.item = match[6];
      break;

    case rgx.leftbuy.test(line):
      match = line.match(rgx.leftbuy);
      ev.type = "leftbuyzone";
      ev.data.date = match[1];
      ev.data.time = match[2];
      ev.data.source = {
        name: match[3],
        steam: parseSteamId(match[4]),
        team: match[5],
      };
      ev.data.items = match[6].split(" ");
      break;

    case rgx.roundstart.test(line):
      match = line.match(rgx.roundstart);
      ev.type = "roundstart";
      ev.data.date = match[1];
      ev.data.time = match[2];
      break;

    case rgx.roundend.test(line):
      match = line.match(rgx.roundend);
      ev.type = "roundend";
      ev.data.date = match[1];
      ev.data.time = match[2];
      break;

    case rgx.freezetime.test(line):
      match = line.match(rgx.freezetime);
      ev.type = "freezetime";
      ev.data.date = match[1];
      ev.data.time = match[2];
      break;

    case rgx.playertriggered.test(line):
      match = line.match(rgx.playertriggered);
      ev.type = "playertriggered";
      ev.data.date = match[1];
      ev.data.time = match[2];
      ev.data.source = {
        name: match[3],
        steam: parseSteamId(match[4]),
        team: match[5],
      };
      ev.data.action = match[6];
      break;

    case rgx.teamtriggered.test(line):
      match = line.match(rgx.teamtriggered);
      ev.type = "teamtriggered";
      ev.data.date = match[1];
      ev.data.time = match[2];
      ev.data.team = match[3];
      ev.data.action = match[4];
      ev.data.score = {
        ct: parseInt(match[5], 10),
        t: parseInt(match[6], 10),
      };
      break;

    case rgx.teamscored.test(line):
      match = line.match(rgx.teamscored);
      ev.type = "teamscored";
      ev.data.date = match[1];
      ev.data.time = match[2];
      ev.data.team = match[3];
      ev.data.score = parseInt(match[4], 10);
      ev.data.alive = parseInt(match[5], 10);
      break;

    case rgx.switchedteam.test(line):
      match = line.match(rgx.switchedteam);
      ev.type = "switchedteam";
      ev.data.date = match[1];
      ev.data.time = match[2];
      ev.data.source = {
        name: match[3],
        steam: parseSteamId(match[4]),
        team: match[5],
      };
      ev.data.target = {
        team: match[6],
      };
      break;

    case rgx.say.test(line):
      match = line.match(rgx.say);
      ev.type = "say";
      ev.data.date = match[1];
      ev.data.time = match[2];
      ev.data.source = {
        name: match[3],
        steam: parseSteamId(match[4]),
        team: match[5],
      };
      ev.data.message = match[6];
      break;

    case rgx.sayteam.test(line):
      match = line.match(rgx.sayteam);
      ev.type = "sayteam";
      ev.data.date = match[1];
      ev.data.time = match[2];
      ev.data.source = {
        name: match[3],
        steam: parseSteamId(match[4]),
        team: match[5],
      };
      ev.data.message = match[6];
      break;

    case rgx.killedother.test(line):
      match = line.match(rgx.killedother);
      ev.type = "killedother";
      ev.data.date = match[1];
      ev.data.time = match[2];
      ev.data.source = {
        name: match[3],
        steam: parseSteamId(match[4]),
        team: match[5],
        coord: match[6],
      };
      ev.data.target = {
        name: match[7],
        coord: match[8],
      };
      ev.data.weapon = match[9];
      break;

    case rgx.get5event.test(line):
      match = line.match(rgx.get5event);
      var g5ev = JSON.parse(match[3]);
      if (g5ev.hasOwnProperty("params") && g5ev.hasOwnProperty("event")) {
        switch (g5ev.event) {
          case "series_start":
          case "series_end":
            ev.type = "get5series";
            break;
          case "map_veto":
          case "map_pick":
          case "side_picked":
            ev.type = "get5veto";
            break;
          case "knife_start":
          case "knife_won":
          case "going_live":
          case "round_end":
          case "side_swap":
          case "map_end":
            ev.type = "get5map";
            break;
          case "match_config_load_fail":
          case "backup_loaded":
            ev.type = "get5misc";
            break;
          default:
            ev.type = "get5";
            break;
        }
      }
      ev.data.date = match[1];
      ev.data.time = match[2];
      if (g5ev.params.hasOwnProperty("client"))
        g5ev.params.client = parseGet5Player(g5ev.params.client);
      if (g5ev.params.hasOwnProperty("attacker"))
        g5ev.params.attacker = parseGet5Player(g5ev.params.attacker);
      if (g5ev.params.hasOwnProperty("victim"))
        g5ev.params.victim = parseGet5Player(g5ev.params.victim);
      if (g5ev.params.hasOwnProperty("assister"))
        g5ev.params.assister = parseGet5Player(g5ev.params.assister);
      if (g5ev.params.hasOwnProperty("flash_assister"))
        g5ev.params.flash_assister = parseGet5Player(
          g5ev.params.flash_assister
        );
      ev.data.get5 = g5ev;
      break;

    case rgx.connect.test(line):
      match = line.match(rgx.connect);
      ev.type = "connected";
      ev.data.date = match[1];
      ev.data.time = match[2];
      ev.data.source = {
        name: match[3],
        steam: parseSteamId(match[4]),
      };
      break;

    case rgx.enteredgame.test(line):
      match = line.match(rgx.enteredgame);
      ev.type = "enteredgame";
      ev.data.date = match[1];
      ev.data.time = match[2];
      ev.data.source = {
        name: match[3],
        steam: parseSteamId(match[4]),
      };
      break;

    case rgx.steamvalidated.test(line):
      match = line.match(rgx.steamvalidated);
      ev.type = "steamvalidated";
      ev.data.date = match[1];
      ev.data.time = match[2];
      ev.data.source = {
        name: match[3],
        steam: parseSteamId(match[4]),
      };
      break;

    case rgx.disconnect.test(line):
      match = line.match(rgx.disconnect);
      ev.type = "disconnected";
      ev.data.date = match[1];
      ev.data.time = match[2];
      ev.data.source = {
        name: match[3],
        steam: parseSteamId(match[4]),
        team: match[5],
      };
      ev.data.reason = match[6];
      break;

    case rgx.matchstart.test(line):
      match = line.match(rgx.matchstart);
      ev.type = "matchstart";
      ev.data.date = match[1];
      ev.data.time = match[2];
      ev.data.map = match[3];
      break;

    case rgx.teamplaying.test(line):
      match = line.match(rgx.teamplaying);
      ev.type = "teamplaying";
      ev.data.date = match[1];
      ev.data.time = match[2];
      ev.data.team = {
        side: match[3],
        name: match[4],
      };
      break;

    case rgx.gameover.test(line):
      match = line.match(rgx.gameover);
      ev.type = "gameover";
      ev.data.date = match[1];
      ev.data.time = match[2];
      ev.data.map = match[3];
      ev.data.score = {
        ct: parseInt(match[4], 10),
        t: parseInt(match[5], 10),
      };
      ev.data.duration = match[6];
      break;

    case rgx.rcon.test(line):
      match = line.match(rgx.rcon);
      ev.type = "rcon";
      ev.data.date = match[1];
      ev.data.time = match[2];
      ev.data.source = match[3];
      ev.data.message = match[4];
      break;

    case rgx.sayconsole.test(line):
      match = line.match(rgx.sayconsole);
      ev.type = "sayconsole";
      ev.data.date = match[1];
      ev.data.time = match[2];
      ev.data.message = match[3];
      break;

    case rgx.smpause.test(line):
      match = line.match(rgx.smpause);
      ev.type = "pause";
      ev.data.date = match[1];
      ev.data.time = match[2];
      break;

    case rgx.smunpause.test(line):
      match = line.match(rgx.smunpause);
      ev.type = "unpause";
      ev.data.date = match[1];
      ev.data.time = match[2];
      break;

    case rgx.accolade.test(line):
      match = line.match(rgx.accolade);
      ev.type = "accolade";
      ev.data.date = match[1];
      ev.data.time = match[2];
      ev.data.accolade = match[3];
      ev.data.source = match[4];
      ev.data.value = parseFloat(match[5]);
      ev.data.pos = parseInt(match[6], 10);
      ev.data.score = parseFloat(match[7]);

    default:
      ev = null;
  }

  return ev;
};

/**
 * Convert player string from get5 events to usable name and steamid
 * @param {string} playerString
 * @returns {ServerEventDataPlayer}
 */
const parseGet5Player = (playerString) => {
  const match = rgx.get5player.test(playerString)
    ? playerString.match(rgx.get5player)
    : [null, null, null];
  return {
    name: match[1],
    steam: parseSteamId(match[2]),
  };
};

//Export parseLine function and rgx object
module.exports = {
  parseLine: parseLine,
};
