const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors");
const { Rcon } = require("rcon-client");
let db = admin.firestore();

const RCON_PASSWORD = "lages1";

exports.main = functions.https.onRequest((request, response) => {
  return cors()(request, response, () => {
    const config = JSON.parse(request.body);
    db.collection("_config")
      .doc("status")
      .get()
      .then((doc) => {
        return Promise.all([
          doc,
          db.collection("_config").doc("config").set(
            {
              useRandomFlashbang: config.bombFlashbang,
              useRandomGranade: config.bombGranade,
              useRandomMolotov: config.bombMolotov,
              useRandomSmoke: config.bombSmoke,
            },
            { merge: true }
          ),
        ]);
      })
      .then(([doc, result]) => {
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
        const commands = generateCommands(config);
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

const generateCommands = (config) => {
  let command = "";
  switch (config.gameType) {
    case "casual":
      command += "game_type 0;game_mode 0;";
      break;
    case "competitive":
      command += "game_type 0;game_mode 1;mp_autokick 0;";
      break;
    case "wingman":
      command += "game_type 0;game_mode 2;";
      break;
    case "armrace":
      command += "game_type 1;game_mode 0;";
      break;
    case "demolition":
      command += "game_type 1;game_mode 1;";
      break;
    case "deathmatch":
      command += "game_type 1;game_mode 2;";
      break;
    case "guardian":
      command += "game_type 4;game_mode 0;";
      break;
    case "co-op_strike":
      command += "game_type 4;game_mode 1;";
      break;
    case "danger_zone":
      command += "game_type 6;game_mode 0;";
      break;
    default:
      break;
  }
  
  command += `changelevel ${config.map};bot_kick;`;
  
  return command;
};
