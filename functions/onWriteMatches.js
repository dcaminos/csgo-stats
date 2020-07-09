const functions = require("firebase-functions");
const admin = require("firebase-admin");
const dbRead = require("./dbRead");
const dbWrite = require("./dbWrite");

let db = admin.firestore();

exports.main = functions.firestore
  .document("_matches/{matchId}")
  .onCreate((snapshot) => {
    const match = snapshot.data();
    if (match) {
      return db.runTransaction((transaction) => {
        const promises = [
          dbRead.getUsers(transaction, match),
          dbRead.getRank(transaction, match),
          dbRead.getPrevPositions(transaction, match),
          dbRead.getKills(transaction, match),
          dbRead.getDeaths(transaction, match),
          dbRead.getDamages(transaction, match),
        ];
        return Promise.all(promises)
          .then((results) => ({
            users: results[0],
            rank: results[1],
            prevPositions: results[2],
            kills: results[3],
            deaths: results[4],
            damages: results[5],
          }))
          .then((data) => {
            const promises = [
              dbWrite.aggregateUsers(transaction, data, match),
              dbWrite.aggregateRank(transaction, data, match),
              dbWrite.aggregateKills(transaction, data, match),
              dbWrite.aggregateDeaths(transaction, data, match),
              dbWrite.aggregateDamages(transaction, data, match),
            ];
            return Promise.all(promises);
          })
          .then(() => {
            return dbWrite.updateMatch(transaction, snapshot.ref, match);
          });
      });
    }
  });
