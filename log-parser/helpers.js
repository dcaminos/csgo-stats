const getMatchId = (date, map) =>
  date.toISOString().substring(0, 19).replace("T", "__") + "__" + map;

const getRankId = (date) =>
  `${("0" + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;

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
      _kills: [],
      _deaths: [],
      _damages: [],
    };
    matchData.users.push(user);
  }
  return user;
};

const findKill = (kills, target, weapon) => {
  let kill = kills.find(
    (kill) => kill.target === target && kill.weapon === weapon
  );
  if (kill === undefined) {
    kill = {
      target: target,
      weapon: weapon,
      count: 0,
      headshots: 0,
    };
    kills.push(kill);
  }
  return kill;
};

const findDeath = (deaths, source, weapon) => {
  let death = deaths.find(
    (death) => death.source === source && death.weapon === weapon
  );
  if (death === undefined) {
    death = {
      source: source,
      weapon: weapon,
      count: 0,
      headshots: 0,
    };
    deaths.push(death);
  }
  return death;
};

const findDamage = (damages, target, weapon, hitgroup) => {
  let damage = damages.find(
    (damage) =>
      damage.target === target &&
      damage.weapon === weapon &&
      damage.hitgroup === hitgroup
  );
  if (damage === undefined) {
    damage = {
      target: target,
      weapon: weapon,
      hitgroup: hitgroup,
      count: 0,
      dealt: 0,
    };
    damages.push(damage);
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
  findDeath: findDeath,
  findDamage: findDamage,
  isFinished: isFinished,
};
