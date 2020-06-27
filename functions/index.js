const admin = require("firebase-admin");
const functions = require("firebase-functions");
const cors = require("cors");

admin.initializeApp(functions.config().firebase);
let db = admin.firestore();

exports.ranking = functions.https.onRequest((request, response) => {
  return cors()(request, response, () => {
    let players = [];

    const parseMatch = (match) => {
      match.team1.forEach((player) =>
        parsePlayer(
          player,
          match.firstHalfScore.team1 + match.secondHalfScore.team1 >
            match.firstHalfScore.team2 + match.secondHalfScore.team2
        )
      );
      match.team2.forEach((player) =>
        parsePlayer(
          player,
          match.firstHalfScore.team1 + match.secondHalfScore.team1 <
            match.firstHalfScore.team2 + match.secondHalfScore.team2
        )
      );
    };

    const parsePlayer = (playerData, isWin) => {
      let player = getPlayer(playerData);

      player.headshotKills += playerData.headshotKills;
      player.name = playerData.name;
      player.kills += playerData.kills;
      player.assists += playerData.assists;
      player.deaths += playerData.deaths;
      player.mvps += playerData.mvps;
      player.score += playerData.score;
      player.rounds += playerData.rounds;
      player.wins += isWin ? 1 : 0;
      player.matches += 1;
    };

    const getPlayer = (playerData) => {
      const index = players.findIndex((e) => e.id === playerData.id);
      if (index > -1) {
        return players[index];
      }

      players.push({
        id: playerData.id,
        headshotKills: 0,
        name: "",
        kills: 0,
        assists: 0,
        deaths: 0,
        mvps: 0,
        score: 0,
        wins: 0,
        matches: 0,
        rounds: 0,
      });

      return players[players.length - 1];
    };

    db.collection("match_info")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          parseMatch(doc.data());
        });
        response.send(players);
        return;
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  });
});
