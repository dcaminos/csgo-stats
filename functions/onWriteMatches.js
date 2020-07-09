const functions = require("firebase-functions");
const admin = require("firebase-admin");
const dbRead = require("./dbRead");
const dbWrite = require("./dbWrite");

let db = admin.firestore();

exports.main = functions.firestore
  .document("_matches/{matchId}")
  .onWrite((change, context) => {
    const match = change.after.data();
    return db.runTransaction((transaction) => {
      const promises = [
        dbRead.getUsers(transaction, match),
        dbRead.getRank(transaction, match),
        dbRead.getPrevPositions(transaction, match),
        dbRead.getDamages(transaction, match),
        dbRead.getKills(transaction, match),
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
          console.log(data.kills);
          const promises = [
            dbWrite.aggregateUsers(transaction, data, match),
            dbWrite.aggregateRank(transaction, data, match),
            dbWrite.aggregateDamages(transaction, data, match),
            dbWrite.aggregateKills(transaction, data, match),
          ];
          return Promise.all(promises);
        });
    });
  });
