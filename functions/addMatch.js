const cors = require("cors");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const dbRead = require("./dbRead");
const dbWrite = require("./dbWrite");

let db = admin.firestore();

exports.main = functions.https.onRequest((request, response) => {
  return cors()(request, response, () => {
    const match = JSON.parse(request.body);
    if (match) {
      return db.runTransaction((transaction) => {
        const promises = [
          dbRead.getItems(transaction, match),
          dbRead.getUsers(transaction, match),
          dbRead.getRank(transaction, match),
          dbRead.getPrevPositions(transaction, match),
          dbRead.getKills(transaction, match),
          dbRead.getDeaths(transaction, match),
          dbRead.getDamages(transaction, match),
        ];
        return Promise.all(promises)
          .then((results) => ({
            items: results[0],
            users: results[1],
            rank: results[2],
            prevPositions: results[3],
            kills: results[4],
            deaths: results[5],
            damages: results[6],
          }))
          .then((data) => {
            const promises = [
              dbWrite.aggregateItems(transaction, data, match),
              dbWrite.aggregateUsers(transaction, data, match),
              dbWrite.aggregateRank(transaction, data, match),
              dbWrite.aggregateKills(transaction, data, match),
              dbWrite.aggregateDeaths(transaction, data, match),
              dbWrite.aggregateDamages(transaction, data, match),
              dbWrite.createMatch(transaction, data, match),
            ];
            return Promise.all(promises);
          })
          .then(() => {
            response.send("ok");
            return;
          })
          .catch((error) => {
            console.log(error);
            return;
          });
      });
    }
    return Promise.resolve();
  });
});
