const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors");
const net_1 = require("net");

let db = admin.firestore();

exports.main = functions.https.onRequest((request, response) => {
  return cors()(request, response, () => {
    db.collection("_config")
      .doc("status")
      .get()
      .then((doc) => {
        const status = doc.data();
        return Promise.all([doc, testConnection(status.ip, status.port)]);
      })
      .then(([doc, testConnectionResult]) => {
        let status = doc.data();
        let promise = null;
        if (testConnectionResult === false && status.state !== "OFF") {
          status.state = "OFF";
          promise = doc.ref.set(status);
        } else if (testConnectionResult === true && status.state !== "ON") {
          status.state = "ON";
          promise = doc.ref.set(status);
        }

        response.send(status);
        return promise;
      })
      .catch((error) => {
        response.send(error);
        return;
      });
  });
});

const testConnection = (host, port) => {
  return new Promise((resolve, reject) => {
    const socket = net_1.createConnection(port, host);
    socket.removeAllListeners("timeout");
    socket.setTimeout(2000);

    socket.once("timeout", (error) => {
      resolve(false);
    });

    socket.once("error", (error) => {
      resolve(false);
    });

    socket.once("connect", () => {
      socket.end();
      resolve(true);
    });
  });
};
