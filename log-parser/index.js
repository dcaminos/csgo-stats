// @ts-check
//Dgram for handling udp server logs being sent in
const dgram = require("dgram");
const socket = dgram.createSocket("udp4");

//Log line parsing utility
const parser = require("./parseMessage");

//On udp socket receiving a message
socket.on("message", function (message) {
  parser.parseMessage(message);
});
//Indicate in console that the udp socket is listening
socket.on("listening", function () {
  var address = socket.address();
  console.log(
    "UDP Server listening on " + address.address + ":" + address.port
  );
});
//Listen for udp on port:
socket.bind(3001);
