const path = require("path");
const fs = require("fs");
const admin = require("firebase-admin");

let serviceAccount = require("./csgo-stats-457a9-4aacb43cb750.json");

const EXTENSION = ".txt";
const PREFIX = "backup_";
const SCORE = "score_";
const STRING_FIELDS = ["map", "name", "disconnected", "LoserMostRecentTeam"];
const DATE_FIELDS = ["timestamp"];

const parse = (args) => {
  try {
    const directory = getDirectory(args);
    const allFiles = getAllFiles(directory);
    const finalFiles = getFinalFiles(allFiles);
    parseFiles(directory, finalFiles);
    if (args.includes("delete")) {
      deteleFile(directory, allFiles);
    }
  } catch (error) {
    console.log(error);
  }
};

const deteleFile = (directory, allFiles) => {
  allFiles.forEach((file) => fs.unlinkSync(directory + file));
};

const getDirectory = (args) => {
  if (args.length === 0) {
    throw "Missing path parameter.";
  }

  return args[0];
};

const getScore = (file) => {
  const index = file.indexOf(SCORE) + SCORE.length;
  return file.substring(index, index + 5).split("_");
};

const getAllFiles = (directory) => {
  return fs
    .readdirSync(directory)
    .filter(
      (file) =>
        path.extname(file).toLowerCase() === EXTENSION &&
        file.includes(PREFIX) &&
        file.includes(SCORE)
    );
};

const getFinalFiles = (allFiles) => {
  return allFiles.filter((file) => {
    const score = getScore(file);
    return (
      score.length === 2 &&
      (score.includes("11") || (score[0] === "10" && score[1] === "10"))
    );
  });
};

const parseFiles = (directory, finalFiles) => {
  if (finalFiles.length === 0) {
    return;
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  let db = admin.firestore();

  finalFiles.forEach((file) => {
    const fileData = parseFile(directory, file);
    let docRef = db.collection("match_info").doc(fileData.name);
    docRef.set(fileData.json);

    let doc2Ref = db.collection("matches").doc(fileData.name);
    doc2Ref.set({
      timestamp: fileData.json.timestamp,
      map: fileData.json.map,
      team1:
        fileData.json.firstHalfScore.team1 +
        fileData.json.secondHalfScore.team1,
      team2:
        fileData.json.firstHalfScore.team2 +
        fileData.json.secondHalfScore.team2,
      players: fileData.json.team1.length + fileData.json.team2.length,
    });
  });
};

const parseFile = (directory, file) => {
  const json = fileToJson(directory, file);
  return {
    name:
      json.timestamp.toISOString().substring(0, 19).replace("T", "__") +
      "__" +
      json.map,
    json: {
      timestamp: json.timestamp,
      map: json.map,
      firstHalfScore: json.FirstHalfScore,
      secondHalfScore: json.SecondHalfScore,
      team1: Object.keys(json.PlayersOnTeam1).map((player) =>
        parsePlayer(player, json.PlayersOnTeam1[player])
      ),
      team2: Object.keys(json.PlayersOnTeam2).map((player) =>
        parsePlayer(player, json.PlayersOnTeam2[player])
      ),
    },
  };
};

const parsePlayer = (player, data) => {
  const rounds = [
    ...new Set([
      ...Object.keys(data.MatchStats.EquipmentValue || {}),
      ...Object.keys(data.MatchStats.LiveTime || {}),
      ...Object.keys(data.MatchStats.Deaths || {}),
      ...Object.keys(data.MatchStats.Kills || {}),
      ...Object.keys(data.MatchStats.Damage || {}),
      ...Object.keys(data.MatchStats.HeadShotKills || {}),
      ...Object.keys(data.MatchStats.Assists || {}),
      ...Object.keys(data.MatchStats.UtilityDamage || {}),
      ...Object.keys(data.MatchStats.Objective || {}),
    ]),
  ];

  return {
    id: player,
    name: data.name,
    kills: data.MatchStats.Totals.Kills,
    assists: data.MatchStats.Totals.Assists,
    deaths: data.MatchStats.Totals.Deaths,
    liveTime: data.MatchStats.Totals.LiveTime,
    headshotKills: data.MatchStats.Totals.HeadshotKills,
    mvps: data.mvps,
    score: data.score,
    rounds: rounds.length,
  };
};

const fileToJson = (directory, file) => {
  const data = fs.readFileSync(directory + file, { encoding: "utf-8" });
  const finalString = (
    "{" +
    data
      .toString()
      .replace(/\t/g, "")
      .replace(/\"\"/g, '":"')
      .replace(/\n/g, "")
      .replace(/\"\"/g, '","')
      .replace(/\"{/g, '":{')
      .replace(/}/g, "},") +
    "}"
  )
    .replace(/},}/g, "}}")
    .replace(/},}/g, "}}");

  const json = JSON.parse(finalString);

  const loopJson = (obj) => {
    for (variable in obj) {
      if (typeof obj[variable] === "string") {
        if (DATE_FIELDS.includes(variable)) {
          obj[variable] = new Date(obj[variable]);
        } else if (STRING_FIELDS.includes(variable)) {
          //do nothing (all ready string)
        } else {
          obj[variable] = parseInt(obj[variable]);
        }
      } else if (typeof obj[variable] === "object") {
        loopJson(obj[variable]);
      }
    }
  };

  loopJson(json);
  return json.SaveFile;
};

parse(process.argv.slice(2));
