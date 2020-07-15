const publicIp = require("public-ip");
const admin = require("firebase-admin");
const rcon = require("./rcon");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const args = process.argv.slice(2);
if (args.includes("--local")) {
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
  //Update server status
  publicIp.v4().then((ip) => {
    let docRef = db.collection("_config").doc("status");
    docRef.set({
      state: "ON",
      ip: ip,
      port: rcon.SERVER_PORT,
    });
  });

  //Update users status
  db.collection("_users")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.set({ online: false }, { merge: true });
      });
    });
};

const setUserOnline = (userId, value) => {
  let docRef = db.collection("_users").doc(userId);
  docRef.set({ online: value }, { merge: true });
};

const sendMatch = (matchData) => {
  let docRef = db.collection("_matches").doc(matchData.id);
  docRef.set(matchData);
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
