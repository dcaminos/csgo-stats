const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors");
const { Rcon } = require("rcon-client");
let db = admin.firestore();

const RCON_PASSWORD = "lages1";

exports.main = functions.https.onRequest((request, response) => {
  return cors()(request, response, () => {
    db.collection("_config")
      .doc("status")
      .get()
      .then((doc) => {
        const status = doc.data();

        return new Promise(async (resolve) => {
          const rcon = new Rcon({
            host: status.ip,
            port: status.port,
            password: RCON_PASSWORD,
          });

          rcon.on("authenticated", () => {
            resolve(rcon);
          });

          await rcon.connect();
        });
      })
      .then((rcon) => {
        const commands = generateCommands(JSON.parse(request.body));
        return Promise.all([rcon, rcon.send(commands)]);
      })
      .then(([rcon, result]) => {
        response.send(result);
        return rcon.end();
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        response.status(500).send(error);
        return;
      });
  });
});

const generateCommands = (body) =>
  "mp_autoteambalance 0;" +
  body.teamA.map((player) => `sm_team "${player.name}" 3;`).join("") +
  body.teamB.map((player) => `sm_team "${player.name}" 2;`).join("") +
  "mp_restartgame 5;";
