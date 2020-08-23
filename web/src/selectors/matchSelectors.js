import moment from "moment";

export const getMatch = ({ firestore: { data } }, id) => {
  if (data._matches === undefined || data._matches[id] === undefined) {
    return undefined;
  }

  if (data._users === undefined) {
    return undefined;
  }

  if (data._config === undefined) {
    return undefined;
  }

  return parseMatch(data._matches[id], data._users, data._config.maps);
};

const parseMatch = (match, users, maps) => ({
  map: maps[match.map] === undefined ? match.map : maps[match.map].name,
  duration: `${match.duration} min`,
  date: moment(match.date).format("dddd, MMMM Do YYYY, h:mm a"),
  chats: (match.chats || [])
    .map((chat) => parseChat(chat, users))
    .filter((c) => c !== null)
    .sort((a, b) => a.timestamp - b.timestamp),
  teamA: {
    players: match.users
      .filter((u) => u.team === "CT")
      .sort((a, b) => b.score - a.score),
    score: match.score.ct,
    label:
      match.score.ct > match.score.t
        ? "WINNERS"
        : match.score.ct < match.score.t
        ? "LOSERS"
        : "",
  },
  teamB: {
    players: match.users
      .filter((u) => u.team === "TERRORIST")
      .sort((a, b) => b.score - a.score),
    score: match.score.t,
    label:
      match.score.t > match.score.ct
        ? "WINNERS"
        : match.score.t < match.score.ct
        ? "LOSERS"
        : "",
  },
});

const parseChat = (chat, users) => {
  const user = users[chat.source];
  if (user === undefined) {
    return null;
  }

  const date = moment(chat.date);
  return {
    timestamp: date.format("X"),
    time: date.format("h:mm a"),
    player: user.name,
    destination: chat.type === "say" ? "ALL" : "TEAM",
    message: chat.message,
  };
};
