const admin = require("firebase-admin");
const functions = require("firebase-functions");

//Cloud
admin.initializeApp(functions.config().firebase);

//Local
/*let serviceAccount = require("../log-parser/csgo-stats-457a9-4aacb43cb750.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});*/

//const onWriteMatches = require("./onWriteMatches");

exports.onWriteMatches = functions.firestore
  .document("_matches/{matchId}")
  .onWrite((change, context) => {
    const match = change.after.data();
    return db.runTransaction((transaction) => {
      const promises = [
        getUsers(transaction, match),
        getRank(transaction, match),
        getPrevPositions(transaction, match),
        getDamages(transaction, match),
        getKills(transaction, match),
      ];
      return Promise.all(promises)
        .then((results) => ({
          users: results[0],
          rank: results[1],
          prevPositions: results[2],
          damages: results[3],
          kills: results[4],
        }))
        .then((data) => {
          const promises = [
            aggregateUsers(transaction, data, match),
            aggregateRank(transaction, data, match),
            aggregateDamages(transaction, data, match),
            aggregateKills(transaction, data, match),
          ];
          return Promise.all(promises);
        });
    });
  });

// ******************
// DBREAD
const getUsers = (transaction, match) => {
  const promises = match.users.map((user) => {
    var userRef = db.collection("_users").doc(user.id);
    return transaction.get(userRef).then((doc) => {
      if (!doc.exists) {
        return {
          id: user.id,
          name: user.name,
          score: 0,
          rounds: 0,
          matches: 0,
          kills: 0,
          deaths: 0,
          assists: 0,
          headshots: 0,
        };
      } else {
        dbUser = doc.data();
        return {
          id: user.id,
          name: user.name,
          score: dbUser.score || 0,
          rounds: dbUser.rounds || 0,
          matches: dbUser.matches || 0,
          kills: dbUser.kills || 0,
          deaths: dbUser.deaths || 0,
          assists: dbUser.assists || 0,
          headshots: dbUser.headshots || 0,
        };
      }
    });
  });

  return Promise.all(promises);
};

const getRank = (transaction, match) => {
  const rankRef = db.collection("_ranks").doc(match.rankId);
  return transaction.get(rankRef).then((doc) => {
    if (!doc.exists) {
      return {
        id: match.rankId,
        users: [],
        matches: [],
      };
    } else {
      return doc.data();
    }
  });
};

const getPrevPositions = (transaction, match) => {
  const prevRankId = getPrevRankId(match.rankId);
  const rankRef = db.collection("_ranks").doc(prevRankId);
  return transaction.get(rankRef).then((doc) => {
    if (doc.exists) {
      const dbPrevRank = doc.data();
      return dbPrevRank.users
        .map((user) => ({
          id: user.id,
          rank: u.score / u.rounds,
        }))
        .sort((a, b) => b.rank - a.rank)
        .map((user, index) => ({
          id: user.id,
          position: index + 1,
        }));
    }
    return [];
  });
};

const getPrevRankId = (rankId) => {
  const words = rankId.split("-");
  if (words[2] === "2") {
    return `${words[0]}-${words[1]}-1`;
  } else {
    if (words[1] === "01") {
      return `${Number(words[0]) - 1}-12-2`;
    } else {
      return `${words[0]}-${("0" + Number(words[1] - 1)).slice(-2)}-2`;
    }
  }
};

const getDamages = (transaction, match) => {
  const promises = match.damages.map((damage) => {
    var damageRef = db.collection("_damages").doc(damage.id);
    return transaction.get(damageRef).then((doc) => {
      if (!doc.exists) {
        return {
          id: damage.id,
          count: 0,
          dealt: 0,
        };
      } else {
        dbDamage = doc.data();
        return {
          id: damage.id,
          count: dbDamage.count,
          dealt: dbDamage.dealt,
        };
      }
    });
  });

  return Promise.all(promises);
};

const getKills = (transaction, match) => {
  const promises = match.kills.map((kill) => {
    var killRef = db.collection("_kills").doc(kill.id);
    return transaction.get(killRef).then((doc) => {
      if (!doc.exists) {
        return {
          id: kill.id,
          count: 0,
          headshots: 0,
        };
      } else {
        dbKill = doc.data();
        return {
          id: kill.id,
          count: dbKill.count,
          headshots: dbKill.headshots,
        };
      }
    });
  });

  return Promise.all(promises);
};

//********************
// DBWRITE

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

const aggregateRank = (transaction, data, match) => {
  if (data.rank.users.length === 0) {
    return aggregateNewRank(transaction, data, match);
  } else {
    return aggregateOldRank(transaction, data, match);
  }
};

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

//OLD IMPLEMENTATIONS
const cors = require("cors");

exports.progress = functions.https.onRequest((request, response) => {
  return cors()(request, response, () => {
    const result = {};

    const parsePlayer = (p, timestamp) => {
      if (!result[p.id]) {
        result[p.id] = {
          id: p.id,
          name: p.name,
          data: [Object.assign(p, { timestamp: timestamp })],
          // data: [{ timestamp: timestamp, ...p }],
        };
      } else {
        result[p.id].data.push(Object.assign(p, { timestamp: timestamp }));
      }
    };

    const findPlayers = (match) => {
      match.team1.forEach((p) => {
        parsePlayer(p, match.timestamp);
      });
      match.team2.forEach((p) => {
        parsePlayer(p, match.timestamp);
      });
    };

    db.collection("match_info")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          findPlayers(doc.data());
        });

        const list = Object.keys(result).map((k) => result[k]);

        response.send(list);
        return;
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  });
});

exports.ranking = functions.https.onRequest((request, response) => {
  return cors()(request, response, () => {
    let players = [];

    const parseMatch = (match) => {
      match.team1.forEach((player) =>
        parsePlayer(
          player,
          match.firstHalfScore.team1 + match.secondHalfScore.team1 >
            match.firstHalfScore.team2 + match.secondHalfScore.team2
        )
      );
      match.team2.forEach((player) =>
        parsePlayer(
          player,
          match.firstHalfScore.team1 + match.secondHalfScore.team1 <
            match.firstHalfScore.team2 + match.secondHalfScore.team2
        )
      );
    };

    const parsePlayer = (playerData, isWin) => {
      let player = getPlayer(playerData);

      player.headshotKills += playerData.headshotKills;
      player.name = playerData.name;
      player.kills += playerData.kills;
      player.assists += playerData.assists;
      player.deaths += playerData.deaths;
      player.mvps += playerData.mvps;
      player.score += playerData.score;
      player.rounds += playerData.rounds;
      player.wins += isWin ? 1 : 0;
      player.matches += 1;
    };

    const getPlayer = (playerData) => {
      const index = players.findIndex((e) => e.id === playerData.id);
      if (index > -1) {
        return players[index];
      }

      players.push({
        id: playerData.id,
        headshotKills: 0,
        name: "",
        kills: 0,
        assists: 0,
        deaths: 0,
        mvps: 0,
        score: 0,
        wins: 0,
        matches: 0,
        rounds: 0,
      });

      return players[players.length - 1];
    };

    db.collection("match_info")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          parseMatch(doc.data());
        });
        response.send(players);
        return;
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  });
});
