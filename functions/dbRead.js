const admin = require("firebase-admin");
let db = admin.firestore();

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
exports.getUsers = getUsers;

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
exports.getRank = getRank;

const getPrevPositions = (transaction, match) => {
  const prevRankId = getPrevRankId(match.rankId);
  const rankRef = db.collection("_ranks").doc(prevRankId);
  return transaction.get(rankRef).then((doc) => {
    if (doc.exists) {
      const dbPrevRank = doc.data();
      return dbPrevRank.users
        .map((user) => ({
          id: user.id,
          rank: user.score / user.rounds,
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
exports.getPrevPositions = getPrevPositions;

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

const getKills = (transaction, match) => {
  const promises = match.users.map((user) => {
    var killRef = db.collection("_kills").doc(user.id);
    return transaction.get(killRef).then((doc) => {
      if (!doc.exists) {
        return {
          id: user.id,
          targets: {},
          weapons: {},
          count: 0,
          headshots: 0,
        };
      } else {
        return doc.data();
      }
    });
  });

  return Promise.all(promises);
};
exports.getKills = getKills;

const getDeaths = (transaction, match) => {
  const promises = match.users.map((user) => {
    var deathRef = db.collection("_deaths").doc(user.id);
    return transaction.get(deathRef).then((doc) => {
      if (!doc.exists) {
        return {
          id: user.id,
          sources: {},
          weapons: {},
          count: 0,
          headshots: 0,
        };
      } else {
        return doc.data();
      }
    });
  });

  return Promise.all(promises);
};
exports.getDeaths = getDeaths;

const getDamages = (transaction, match) => {
  const promises = match.users.map((user) => {
    var killRef = db.collection("_damages").doc(user.id);
    return transaction.get(killRef).then((doc) => {
      if (!doc.exists) {
        return {
          id: user.id,
        };
      } else {
        return doc.data();
      }
    });
  });

  return Promise.all(promises);
};
exports.getDamages = getDamages;
