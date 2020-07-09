// @ts-check
//Dgram for handling udp server logs being sent in
const dgram = require("dgram");
const socket = dgram.createSocket("udp4");
const firestore = require("./firestore");
const parser = require("./parseline");
const session = require("./session");

firestore.initServer();

//On udp socket receiving a message
socket.on("message", function (message) {
  parseMessage(message);
});

//Indicate in console that the udp socket is listening
socket.on("listening", function () {
  var address = socket.address();
  console.log(
    "UDP Server listening on " + address.address + ":" + address.port
  );
});

const parseMessage = (message) => {
  const msg = message.toString("ascii").slice(5, -1).trim();
  const ev = parser.parseLine(msg);

  if (ev !== null) {
    if (session[ev.type] !== undefined) {
      session[ev.type](ev);
    }
  }
};

//Listen for udp on port:
socket.bind(3001);
