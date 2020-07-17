import moment from "moment";

export const getRankList = ({ firestore: { data } }) => {
  if (data._config === undefined) {
    return undefined;
  }

  if (!data._config.items) {
    return undefined;
  }

  return data._config.items.ranks;
};

export const getRank = (state, rankId) => {
  if (state.firestore.data._ranks === undefined) {
    return undefined;
  }

  if (state.firestore.data._ranks[rankId] === undefined) {
    return undefined;
  }

  return state.firestore.data._ranks[rankId].users
    .map(parseRanking)
    .sort((a, b) => b.rank - a.rank)
    .map((player, index) => ({ ...player, position: index + 1 }));
};

export const getMatches = (state, rankId) => {
  if (state.firestore.data._ranks === undefined) {
    return undefined;
  }

  if (state.firestore.data._ranks[rankId] === undefined) {
    return undefined;
  }

  if (state.firestore.data._config === undefined) {
    return undefined;
  }

  return state.firestore.data._ranks[rankId].matches
    .map((match) => parseMatch(match, state.firestore.data._config.maps))
    .sort((a, b) => b.timestamp - a.timestamp);
};

const parseMatch = (match, maps) => {
  const date = moment(match.date);
  return {
    ...match,
    map: maps === undefined ? match.map : maps[match.map].name,
    timestamp: date.format("X"),
    date: date.format("dddd, MMMM Do YYYY, h:mm a"),
    shortDate: date.format("l, LT"),
    result: `${match.score.ct} - ${match.score.t}`,
  };
};

const parseRanking = (player, index) => {
  const rank = Number(player.score / player.rounds);
  return {
    ...player,
    kills: `${(player.kills / player.rounds).toFixed(3).replace(".", ",")}`,
    deaths: `${(player.deaths / player.rounds).toFixed(3).replace(".", ",")}`,
    assists: `${(player.assists / player.rounds).toFixed(3).replace(".", ",")}`,
    headshots: `${(player.headshots / player.rounds)
      .toFixed(3)
      .replace(".", ",")}`,
    rank: rank,
    rankText: `${rank.toFixed(3).replace(".", ",")}`,
  };
};
