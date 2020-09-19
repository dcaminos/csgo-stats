const helpers = require("./helpers");
const firestore = require("./firestore");
const rcon = require("./rcon");

const SCORE_KILL = 2;
const SCORE_ASSIST = 1;
const SCORE_BOMB_PLANTED = 2;
const SCORE_BOMB_DEFUSED = 2;
const BOMB_PLANTER_ALIVE = 2;
const BOMB_PLANTER_DEATH = 1;
const ALIVE_ON_TARGET = 1;

let matchData = null;
let usersData = [];
let bombPlanter = null;
let bombDefuser = null;
let isRoundFinished = true;

const matchStart = (event) => {
  const map = event.data.map;
  const date = new Date(`${event.data.date} ${event.data.time}`);

  matchData = {
    id: helpers.getMatchId(date, map),
    rankId: helpers.getRankId(date),
    map: map,
    date: date,
    users: [],
    chats: [],
    kills: {},
    deaths: {},
    damages: {},
  };

  if (map.substr(0, 2) === "ar") {
    return rcon.runCommand("mp_forcecamera 1;bot_kick;mp_roundtime 10.00;mp_warmuptime 10;mp_autokick 0;");
  } else {
    return rcon.runCommand(
      "mp_forcecamera 1;bot_kick;mp_maxrounds 21;mp_halftime 1;mp_roundtime 1.99;mp_freezetime 6;mp_warmuptime 10;mp_autokick 0;"
    );
  }
};

const enteredGame = (event) => {
  const userId = event.data.source.steam;
  const user = usersData.find((user) => user.id === userId);
  if (user === undefined) {
    usersData.push({
      id: userId,
      team: "Unassigned",
      name: event.data.source.name,
      alive: false,
    });
  } else {
    user.team = "Unassigned";
    user.name = event.data.source.name;
  }
  return firestore.setUserOnline(userId, true);
};

const disconnected = (event) => {
  const userId = event.data.source.steam;
  const index = usersData.findIndex((user) => user.id === userId);
  if (index > -1) {
    usersData.splice(index, 1);
  }

  return firestore.setUserOnline(userId, false);
};

const switchedTeam = (event) => {
  const userId = event.data.source.steam;
  const user = usersData.find((user) => user.id === userId);
  if (user === undefined) {
    usersData.push({
      id: userId,
      team: event.data.target.team,
    });
  } else {
    user.team = event.data.target.team;
  }
};

const kill = (event) => {
  if (matchData === null) {
    return;
  }
  const source = helpers.findPlayer(matchData, event.data.source);
  const target = helpers.findPlayer(matchData, event.data.target);
  helpers.checkKill(matchData, source.id, target.id, event.data.weapon);
  helpers.checkDeadh(matchData, source.id, target.id, event.data.weapon);

  source.kills++;
  target.deaths++;
  matchData.kills[source.id].count++;
  matchData.kills[source.id].targets[target.id].count++;
  matchData.kills[source.id].weapons[event.data.weapon].count++;
  matchData.deaths[target.id].count++;
  matchData.deaths[target.id].sources[source.id].count++;
  matchData.deaths[target.id].weapons[event.data.weapon].count++;
  if (event.data.headshot) {
    source.headshots++;
    matchData.kills[source.id].headshots++;
    matchData.kills[source.id].targets[target.id].headshots++;
    matchData.kills[source.id].weapons[event.data.weapon].headshots++;
    matchData.deaths[target.id].headshots++;
    matchData.deaths[target.id].sources[source.id].headshots++;
    matchData.deaths[target.id].weapons[event.data.weapon].headshots++;
  }
  source.score += SCORE_KILL;

  const targetUserData = usersData.find((user) => user.id === target.id);
  if (targetUserData !== undefined) {
    targetUserData.alive = false;
  }
};

const damage = (event) => {
  if (matchData === null) {
    return;
  }

  const source = helpers.findPlayer(matchData, event.data.source);
  const hitgroupId = event.data.hitgroup.trim();
  helpers.checkDamage(matchData, source.id, hitgroupId);
  matchData.damages[source.id][hitgroupId]++;
};

const assist = (event) => {
  if (matchData === null) {
    return;
  }

  const source = helpers.findPlayer(matchData, event.data.source);
  source.assists++;
  source.score += SCORE_ASSIST;
};

const say = (event) => {
  if (matchData === null) {
    return;
  }

  const source = helpers.findPlayer(matchData, event.data.source);
  matchData.chats.push({
    source: source.id,
    type: event.type,
    date: new Date(`${event.data.date} ${event.data.time}`),
    message: event.data.message,
  });
};

const teamTriggered = (event) => {
  if (matchData === null) {
    return;
  }

  if (
    event.data.action === "SFUI_Notice_Target_Bombed" &&
    bombPlanter !== null
  ) {
    matchData.users.forEach((user) => {
      const userData = usersData.find((userData) => userData.id === user.id);
      if (
        userData !== undefined &&
        userData.team === "TERRORIST" &&
        userData.alive &&
        userData.id !== bombPlanter.steam
      ) {
        user.score += ALIVE_ON_TARGET;
      }
    });

    const sourceUD = usersData.find((user) => user.id === bombPlanter.steam);
    if (sourceUD !== undefined) {
      const source = helpers.findPlayer(matchData, bombPlanter);
      if (sourceUD.alive) {
        source.score += BOMB_PLANTER_ALIVE;
      } else {
        source.score += BOMB_PLANTER_DEATH;
      }
    }
  } else if (
    event.data.action === "SFUI_Notice_Bomb_Defused" &&
    bombDefuser != null
  ) {
    matchData.users.forEach((user) => {
      const userData = usersData.find((userData) => userData.id === user.id);
      if (
        userData !== undefined &&
        userData.team === "CT" &&
        userData.alive &&
        userData.id !== bombDefuser.steam
      ) {
        user.score += ALIVE_ON_TARGET;
      }
    });
  }
};

const playerTriggered = (event, fromFile) => {
  if (matchData === null) {
    return;
  }

  if (event.data.action === "Got_The_Bomb") {
    //Start round
    if (isRoundFinished)
      distributeBombs(fromFile);
  }

  const source = helpers.findPlayer(matchData, event.data.source);
  if (event.data.action === "Planted_The_Bomb") {
    bombPlanter = event.data.source;
    source.score += SCORE_BOMB_PLANTED;
    isRoundFinished=true;
  } else if (event.data.action === "Defused_The_Bomb") {
    bombDefuser = event.data.source;
    source.score += SCORE_BOMB_DEFUSED;
  }
};

const distributeBombs = (fromFile) => {
  if (fromFile === true) {
    return Promise.resolve();
  }
  usersData.forEach((user) => (user.alive = true));
  
  isRoundFinished=false;

  return firestore.getCurrentConfig().then((config) => {
    if (config === undefined) {
      return;
    }
    
    const cts = usersData.filter((user) => user.team === "CT");
    const ts = usersData.filter((user) => user.team === "TERRORIST");

    let command = "";
    if (config.useRandomGranade) {
      command += applyRandomBomb("hegrenade", cts);
      command += applyRandomBomb("hegrenade", ts);
    }
    if (config.useRandomMolotov) {
      command += applyRandomBomb("molotov", cts);
      command += applyRandomBomb("molotov", ts);
    }
    if (config.useRandomFlashbang) {
      command += applyRandomBomb("flashbang", cts);
      command += applyRandomBomb("flashbang", ts);
    }
    if (config.useRandomSmoke) {
      command += applyRandomBomb("smokegrenade", cts);
      command += applyRandomBomb("smokegrenade", ts);
    }

    return rcon.runCommand(command);
  });
};

const applyRandomBomb = (bomb, team) => {
  if (team.length === 0) {
    return "";
  }

  const user = team[Math.floor(Math.random() * team.length)];
  return `sm_give "${user.name}" ${bomb};`;
};

const roundEnd = (event) => {
  isRoundFinished = true;
  
  if (matchData === null) {
    return;
  }

  usersData.forEach((user) => {
    if (user.team === "TERRORIST" || user.team === "CT") {
      const player = helpers.findPlayerById(matchData, user.id);
      if (player !== undefined) {
        player.rounds++;
      }
    }
  });
};

const gameOver = (event, file) => {
  if (matchData === null) {
    return;
  }

  matchData.duration = event.data.duration;
  matchData.score = event.data.score;

  usersData.forEach((user) => {
    if (user.team === "TERRORIST" || user.team === "CT") {
      const player = helpers.findPlayerById(matchData, user.id);
      if (player !== undefined) {
        player.team = user.team;
      }
    }
  });

  if (helpers.isFinished(matchData)) {
    return firestore.sendMatch(matchData);
  }
};

module.exports = {
  matchstart: matchStart,
  enteredgame: enteredGame,
  disconnected: disconnected,
  switchedteam: switchedTeam,
  kill: kill,
  damage: damage,
  assist: assist,
  say: say,
  sayteam: say,
  playertriggered: playerTriggered,
  teamtriggered: teamTriggered,
  roundend: roundEnd,
  gameover: gameOver,
};
