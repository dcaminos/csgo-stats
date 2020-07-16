const publicIp = require("public-ip");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
const rcon = require("./rcon");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

let API_URL = "https://us-central1-csgo-stats-457a9.cloudfunctions.net/";
const args = process.argv.slice(2);
if (args.includes("--local")) {
  API_URL = "http://localhost:5001/csgo-stats-457a9/us-central1/";
  admin.firestore().settings({
    ignoreUndefinedProperties: true,
    host: "localhost:8080",
    ssl: false,
  });
} else {
  admin.firestore().settings({
    ignoreUndefinedProperties: true,
  });
}

let db = admin.firestore();

const initServer = () => {
  const promises = [];

  //Update server status
  promises.puash(
    publicIp.v4().then((ip) => {
      let docRef = db.collection("_config").doc("status");
      docRef.set({
        state: "ON",
        ip: ip,
        port: rcon.SERVER_PORT,
      });
    })
  );

  //Update users status
  promises.puash(
    db
      .collection("_users")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.set({ online: false }, { merge: true });
        });
      })
  );

  return Promise.all(promises);
};

const setUserOnline = (userId, value) => {
  let docRef = db.collection("_users").doc(userId);
  return docRef.set({ online: value }, { merge: true });
};

const sendMatch = (matchData) => {
  const url = new URL(API_URL + "addMatch");
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(matchData),
  });
};

const getCurrentConfig = () => {
  return db
    .collection("_config")
    .doc("config")
    .get()
    .then((doc) => doc.data());
};

module.exports = {
  sendMatch: sendMatch,
  initServer: initServer,
  setUserOnline: setUserOnline,
  getCurrentConfig: getCurrentConfig,
};
