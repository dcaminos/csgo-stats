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
              useTeammatesAreEnemies: config.teammatesAreEnemies,
              addBotCt: config.addBotCt,
              addBotT: config.addBotT,
              botLevel: config.botLevel,
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
    
  if (config.useTeammatesAreEnemies) {
    command += "mp_teammates_are_enemies 1;mp_autokick 0;"
  }
  
  command += "bot_kick;";
    
  if (config.addBotCt) {
    command += getBots(config.addBotCt, "ct", config.botLevel);
  }
  
  if (config.addBotT) {
    command += getBots(config.addBotT, "t", config.botLevel);
  }
  
  return command;
};

const getBots = (qty, botType, botLevel) => {
  let command = "";
  for (let index = 0; index < qty; index++) {
    command += `bot_add ${botType} ${botLevel};`;
  }
  return command;
};