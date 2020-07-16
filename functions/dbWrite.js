const admin = require("firebase-admin");
const FieldValue = admin.firestore.FieldValue;
let db = admin.firestore();

const aggregateItems = (transaction, data, match) => {
  const dbItems = Object.assign({}, data.items);
  if (!dbItems.ranks.includes(match.rankId)) {
    dbItems.ranks.push(match.rankId);
  }

  if (!dbItems.matches.includes(match.id)) {
    dbItems.matches.push(match.id);
  }

  var configRef = db.collection("_config").doc("items");
  return transaction.set(configRef, dbItems);
};
exports.aggregateItems = aggregateItems;

const aggregateUsers = (transaction, data, match) => {
  const promises = match.users.map((user) => {
    const dbUser = data.users.find((dbUser) => dbUser.id === user.id);
    dbUser.score += user.score;
    dbUser.rounds += user.rounds;
    dbUser.matches += 1;
    dbUser.kills += user.kills;
    dbUser.deaths += user.deaths;
    dbUser.assists += user.assists;
    dbUser.headshots += user.headshots;

    var userRef = db.collection("_users").doc(user.id);
    return transaction.set(userRef, dbUser);
  });

  return Promise.all(promises);
};
exports.aggregateUsers = aggregateUsers;

const aggregateRank = (transaction, data, match) => {
  if (data.rank.users.length === 0) {
    return aggregateNewRank(transaction, data, match);
  } else {
    return aggregateOldRank(transaction, data, match);
  }
};
exports.aggregateRank = aggregateRank;

const aggregateNewRank = (transaction, data, match) => {
  const dbRank = Object.assign({}, data.rank);
  dbRank.users = match.users.map((user) => {
    const prevPositionElement = data.prevPositions.find(
      (e) => e.id === user.id
    );
    return {
      id: user.id,
      name: user.name,
      score: user.score,
      rounds: user.rounds,
      matches: 1,
      kills: user.kills,
      deaths: user.deaths,
      assists: user.assists,
      headshots: user.headshots,
      prevPosition:
        prevPositionElement !== undefined ? prevPositionElement.position : null,
    };
  });
  dbRank.matches.push({
    id: match.id,
    date: match.date,
    map: match.map,
    players: match.users.length,
    score: match.score,
    duration: match.duration,
  });

  var rankRef = db.collection("_ranks").doc(dbRank.id);
  return transaction.set(rankRef, dbRank);
};

const aggregateOldRank = (transaction, data, match) => {
  const dbRank = Object.assign({}, data.rank);
  match.users.forEach((user) => {
    dbUser = dbRank.users.find((dbUser) => dbUser.id === user.id);
    if (dbUser === undefined) {
      const prevPositionElement = data.prevPositions.find(
        (e) => e.id === user.id
      );
      dbRank.users.push({
        id: user.id,
        name: user.name,
        score: user.score,
        rounds: user.rounds,
        matches: 1,
        kills: user.kills,
        deaths: user.deaths,
        assists: user.assists,
        headshots: user.headshots,
        prevPosition:
          prevPositionElement !== undefined
            ? prevPositionElement.position
            : null,
      });
    } else {
      dbUser.name = user.name;
      dbUser.score += user.score;
      dbUser.rounds += user.rounds;
      dbUser.matches += 1;
      dbUser.kills += user.kills;
      dbUser.deaths += user.deaths;
      dbUser.assists += user.assists;
      dbUser.headshots += user.headshots;
    }
  });
  dbRank.matches.push({
    id: match.id,
    date: match.date,
    map: match.map,
    players: match.users.length,
    score: match.score,
    duration: match.duration,
  });

  var rankRef = db.collection("_ranks").doc(dbRank.id);
  return transaction.set(rankRef, dbRank);
};

const aggregateKills = (transaction, data, match) => {
  const promises = Object.keys(match.kills).map((userId) => {
    const kill = match.kills[userId];
    const dbKill = data.kills.find((dbKill) => dbKill.id === userId);
    dbKill.count += kill.count;
    dbKill.headshots += kill.headshots;

    Object.keys(kill.targets).forEach((targetId) => {
      if (dbKill.targets[targetId] === undefined) {
        dbKill.targets[targetId] = kill.targets[targetId];
      } else {
        dbKill.targets[targetId].count += kill.targets[targetId].count;
        dbKill.targets[targetId].headshots += kill.targets[targetId].headshots;
      }
    });

    Object.keys(kill.weapons).forEach((weaponId) => {
      if (dbKill.weapons[weaponId] === undefined) {
        dbKill.weapons[weaponId] = kill.weapons[weaponId];
      } else {
        dbKill.weapons[weaponId].count += kill.weapons[weaponId].count;
        dbKill.weapons[weaponId].headshots += kill.weapons[weaponId].headshots;
      }
    });

    var killRef = db.collection("_kills").doc(userId);
    return transaction.set(killRef, dbKill);
  });

  return Promise.all(promises);
};
exports.aggregateKills = aggregateKills;

const aggregateDeaths = (transaction, data, match) => {
  const promises = Object.keys(match.deaths).map((userId) => {
    const death = match.deaths[userId];
    const dbDeath = data.deaths.find((dbDeath) => dbDeath.id === userId);
    dbDeath.count += death.count;
    dbDeath.headshots += death.headshots;

    Object.keys(death.sources).forEach((sourceId) => {
      if (dbDeath.sources[sourceId] === undefined) {
        dbDeath.sources[sourceId] = death.sources[sourceId];
      } else {
        dbDeath.sources[sourceId].count += death.sources[sourceId].count;
        dbDeath.sources[sourceId].headshots +=
          death.sources[sourceId].headshots;
      }
    });

    Object.keys(death.weapons).forEach((weaponId) => {
      if (dbDeath.weapons[weaponId] === undefined) {
        dbDeath.weapons[weaponId] = death.weapons[weaponId];
      } else {
        dbDeath.weapons[weaponId].count += death.weapons[weaponId].count;
        dbDeath.weapons[weaponId].headshots +=
          death.weapons[weaponId].headshots;
      }
    });

    var deathRef = db.collection("_deaths").doc(userId);
    return transaction.set(deathRef, dbDeath);
  });

  return Promise.all(promises);
};
exports.aggregateDeaths = aggregateDeaths;

const aggregateDamages = (transaction, data, match) => {
  const promises = Object.keys(match.damages).map((userId) => {
    const damage = match.damages[userId];
    const dbDamage = data.damages.find((dbDamage) => dbDamage.id === userId);

    Object.keys(damage).forEach((hitgroupId) => {
      if (dbDamage[hitgroupId] === undefined) {
        dbDamage[hitgroupId] = damage[hitgroupId];
      } else {
        dbDamage[hitgroupId] += damage[hitgroupId];
      }
    });

    var damagedRef = db.collection("_damages").doc(userId);
    return transaction.set(damagedRef, dbDamage);
  });

  return Promise.all(promises);
};
exports.aggregateDamages = aggregateDamages;

const createMatch = (transaction, data, match) => {
  const finalKills = [];
  Object.keys(match.kills).forEach((sourceId) => {
    const kill = match.kills[sourceId];
    Object.keys(kill.targets).forEach((targetId) => {
      finalKills.push({
        s: sourceId,
        t: targetId,
      });
    });
  });

  var matchRef = db.collection("_matches").doc(match.id);
  return transaction.set(matchRef, {
    id: match.id,
    date: match.date,
    chats: match.chats,
    duration: match.duration,
    map: match.map,
    rankId: match.rankId,
    score: match.score,
    users: match.users,
    kills: finalKills,
  });
};
exports.createMatch = createMatch;
