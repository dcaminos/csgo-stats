const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

admin.firestore().settings({
  ignoreUndefinedProperties: true,
});

const addMatch = require("./addMatch");
const checkServerStatus = require("./checkServerStatus");
const startServer = require("./startServer");
const stopServer = require("./stopServer");
const setTeams = require("./setTeams");

exports.addMatch = addMatch.main;
exports.checkServerStatus = checkServerStatus.main;
exports.startServer = startServer.main;
exports.stopServer = stopServer.main;
exports.setTeams = setTeams.main;
