const getMatchId = (date, map) =>
  date.toISOString().substring(0, 19).replace("T", "__") + "__" + map;

const getRankId = (date) =>
  `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${
    date.getDate() < 15 ? "1" : "2"
  }`;

const findPlayer = (matchData, player) => {
  let user = matchData.users.find((user) => user.id === player.steam);
  if (user === undefined) {
    user = {
      id: player.steam,
      name: player.name,
      score: 0,
      rounds: 0,
      kills: 0,
      assists: 0,
      deaths: 0,
      headshots: 0,
    };
    matchData.users.push(user);
  }
  user.name = player.name;
  return user;
};

const findPlayerById = (matchData, playerId) => {
  return matchData.users.find((user) => user.id === playerId);
};

const checkKill = (matchData, sourceId, targetId, weaponId) => {
  if (matchData.kills[sourceId] === undefined) {
    matchData.kills[sourceId] = {
      targets: {},
      weapons: {},
      count: 0,
      headshots: 0,
    };
  }

  if (matchData.kills[sourceId].targets[targetId] === undefined) {
    matchData.kills[sourceId].targets[targetId] = {
      count: 0,
      headshots: 0,
    };
  }

  if (matchData.kills[sourceId].weapons[weaponId] === undefined) {
    matchData.kills[sourceId].weapons[weaponId] = {
      count: 0,
      headshots: 0,
    };
  }
};

const checkDeadh = (matchData, sourceId, targetId, weaponId) => {
  if (matchData.deaths[targetId] === undefined) {
    matchData.deaths[targetId] = {
      sources: {},
      weapons: {},
      count: 0,
      headshots: 0,
    };
  }

  if (matchData.deaths[targetId].sources[sourceId] === undefined) {
    matchData.deaths[targetId].sources[sourceId] = {
      count: 0,
      headshots: 0,
    };
  }

  if (matchData.deaths[targetId].weapons[weaponId] === undefined) {
    matchData.deaths[targetId].weapons[weaponId] = {
      count: 0,
      headshots: 0,
    };
  }
};

const checkDamage = (matchData, sourceId, hitgroupId) => {
  if (matchData.damages[sourceId] === undefined) {
    matchData.damages[sourceId] = {};
  }

  if (matchData.damages[sourceId][hitgroupId] === undefined) {
    matchData.damages[sourceId][hitgroupId] = 0;
  }
};

const isFinished = (matchData) => {
  if (matchData.score) {
    if (
      matchData.score.ct === 11 ||
      matchData.score.t === 11 ||
      (matchData.score.ct === 10 && matchData.score.ct === 10)
    ) {
      return true;
    }
  }
  return false;
};

module.exports = {
  getMatchId: getMatchId,
  getRankId: getRankId,
  findPlayer: findPlayer,
  findPlayerById: findPlayerById,
  checkKill: checkKill,
  checkDeadh: checkDeadh,
  checkDamage: checkDamage,
  isFinished: isFinished,
};
