const publicIp = require("public-ip");
const admin = require("firebase-admin");
const SERVER_PORT = "27015";
let serviceAccount = require("./csgo-stats-457a9-4aacb43cb750.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
let db = admin.firestore();

const proccesMatch = (events) => {
  if (isFinished(events)) {
    const id = getMatchId(events);

    let docRef = db.collection("match_info").doc(id);
    docRef.set(
      {
        events: events,
      },
      { merge: true }
    );
    return;
  }
};

const isFinished = (events) => {
  const lastEv = events[events.length - 1];
  if (lastEv.type === "gameover") {
    if (lastEv.data.score) {
      if (
        lastEv.data.score.ct === 11 ||
        lastEv.data.score.t === 11 ||
        (lastEv.data.score.ct === 10 && lastEv.data.score.ct === 10)
      ) {
        return true;
      }
    }
  }
  return false;
};

const getMatchId = (events) => {
  const map = events[0].data.map;
  const date = new Date(
    `${events[events.length - 1].data.date} ${
      events[events.length - 1].data.time
    }`
  );
  return date.toISOString().substring(0, 19).replace("T", "__") + "__" + map;
};

publicIp.v4().then((ip) => {
  let docRef = db.collection("config").doc("status");
  docRef.set({
    state: "ON",
    ip: `${ip}:${SERVER_PORT}`,
  });
});

module.exports = proccesMatch;
