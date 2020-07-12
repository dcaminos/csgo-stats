const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors");
const fetch = require("node-fetch");

const INSTANCE_ID = "i-03fc606c65cc6a1c6";
const API_GATEWAY_URL =
  "https://3hsdhg6tok.execute-api.sa-east-1.amazonaws.com/test/invocations";

let db = admin.firestore();

exports.main = functions.https.onRequest((request, response) => {
  return cors()(request, response, () => {
    const url = new URL(API_GATEWAY_URL);
    var data = {
      action: "stop",
      instanceId: INSTANCE_ID,
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then(() => {
        return db
          .collection("_config")
          .doc("status")
          .set({ state: "OFF" }, { merge: true });
      })
      .catch((error) => {
        response.send(error);
        return Promise.resolve();
      });
  });
});
