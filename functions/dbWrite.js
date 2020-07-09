const admin = require("firebase-admin");
let db = admin.firestore();

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
        score: user.score,
        rounds: user.rounds,
        matches: user.matches,
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

const aggregateDamages = (transaction, data, match) => {
  const promises = match.damages.map((damage) => {
    const dbDamage = data.damages.find((dbDamage) => dbDamage.id === damage.id);
    dbDamage.count += damage.count;
    dbDamage.dealt += damage.dealt;

    var damageRef = db.collection("_damages").doc(damage.id);
    return transaction.set(damageRef, {
      count: dbDamage.count,
      dealt: dbDamage.dealt,
    });
  });

  return Promise.all(promises);
};
exports.aggregateDamages = aggregateDamages;

const aggregateKills = (transaction, data, match) => {
  const promises = match.kills.map((kill) => {
    const dbKill = data.kills.find((dbKill) => dbKill.id === kill.id);
    dbKill.count += kill.count;
    dbKill.headshots += kill.headshots;

    var killRef = db.collection("_kills").doc(kill.id);
    return transaction.set(killRef, {
      count: dbKill.count,
      headshots: dbKill.headshots,
    });
  });

  return Promise.all(promises);
};
exports.aggregateKills = aggregateKills;
