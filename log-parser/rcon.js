const { Rcon } = require("rcon-client");

const SERVER_IP = "172.31.41.90";
const SERVER_PORT = 27015;
const RCON_PASSWORD = "lages1";

const runCommand = (command) => {
  return new Promise(async (resolve, reject) => {
    const rcon = new Rcon({
      host: SERVER_IP,
      port: SERVER_PORT,
      password: RCON_PASSWORD,
    });

    rcon.on("authenticated", () => {
      resolve(rcon);
    });

    rcon.on("error", (error) => {
      reject(error);
    });

    await rcon.connect().catch((error) => reject(error));
  })
    .then((rcon) => Promise.all([rcon, rcon.send(command)]))
    .then(([rcon, result]) => {
      return rcon.end();
    })
    .catch((error) => {
      console.log(error);
      return;
    });
};

module.exports = {
  SERVER_PORT: SERVER_PORT,
  runCommand: runCommand,
  setPublicIp: setPublicIp,
};
