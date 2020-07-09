const getMatchId = (date, map) =>
  date.toISOString().substring(0, 19).replace("T", "__") + "__" + map;

const getRankId = (date) =>
  `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${
    date.getDay() < 15 ? "1" : "2"
  }`;

const findPlayer = (matchData, playerId) => {
  let user = matchData.users.find((user) => user.id === playerId);
  if (user === undefined) {
    user = {
      id: playerId,
      score: 0,
      rounds: 0,
      kills: 0,
      assists: 0,
      deaths: 0,
      headshots: 0,
    };
    matchData.users.push(user);
  }
  return user;
};

const findKill = (matchData, source, target, weapon) => {
  let kill = matchData.kills.find(
    (kill) => kill.id === `${source}-${target}-${weapon}`
  );
  if (kill === undefined) {
    kill = {
      id: `${source}-${target}-${weapon}`,
      count: 0,
      headshots: 0,
    };
    matchData.kills.push(kill);
  }
  return kill;
};

const findDamage = (matchData, source, weapon, hitgroup) => {
  let damage = matchData.damages.find(
    (damage) => damage.id === `${source}-${weapon}-${hitgroup.trim()}`
  );
  if (damage === undefined) {
    damage = {
      id: `${source}-${weapon}-${hitgroup.trim()}`,
      count: 0,
      dealt: 0,
    };
    matchData.damages.push(damage);
  }
  return damage;
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
  findKill: findKill,
  findDamage: findDamage,
  isFinished: isFinished,
};
