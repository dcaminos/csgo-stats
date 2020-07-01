import moment from "moment";

export const getMatchesList = ({ firestore: { data } }) => {
  if (data.matches === undefined) {
    return undefined;
  }

  return Object.keys(data.matches)
    .map((match) => parseMatch(data.matches, match))
    .sort((a, b) => b.timestamp - a.timestamp);
};

export const getMatchInfo = ({ firestore: { data } }, id) => {
  if (data.match_info === undefined || data.match_info[id] === undefined) {
    return undefined;
  }

  return parseMatchInfo(data.match_info[id]);
};

const parseMatch = (matches, match) => ({
  id: match,
  timestamp: matches[match].timestamp.seconds,
  date: moment
    .unix(matches[match].timestamp.seconds)
    .format("dddd, MMMM Do YYYY, h:mm a"),
  shortDate: moment.unix(matches[match].timestamp.seconds).format("l, LT"),
  map: matches[match].map,
  players: matches[match].players,
  result: matches[match].team1 + " - " + matches[match].team2,
});

const parseMatchInfo = (matchInfo) => ({
  map: matchInfo.map,
  date: moment
    .unix(matchInfo.timestamp.seconds)
    .format("dddd, MMMM Do YYYY, h:mm a"),
  team1: [...matchInfo.team1].sort((a, b) => b.score - a.score),
  team2: [...matchInfo.team2].sort((a, b) => b.score - a.score),
  resultTeam1: {
    isWinner:
      matchInfo.firstHalfScore.team1 + matchInfo.secondHalfScore.team1 >
      matchInfo.firstHalfScore.team2 + matchInfo.secondHalfScore.team2,
    isLosers:
      matchInfo.firstHalfScore.team1 + matchInfo.secondHalfScore.team1 <
      matchInfo.firstHalfScore.team2 + matchInfo.secondHalfScore.team2,
    total: matchInfo.firstHalfScore.team1 + matchInfo.secondHalfScore.team1,
    partA: matchInfo.firstHalfScore.team1,
    partB: matchInfo.secondHalfScore.team1,
  },
  resultTeam2: {
    isWinner:
      matchInfo.firstHalfScore.team2 + matchInfo.secondHalfScore.team2 >
      matchInfo.firstHalfScore.team1 + matchInfo.secondHalfScore.team1,
    isLosers:
      matchInfo.firstHalfScore.team2 + matchInfo.secondHalfScore.team2 <
      matchInfo.firstHalfScore.team1 + matchInfo.secondHalfScore.team1,
    total: matchInfo.firstHalfScore.team2 + matchInfo.secondHalfScore.team2,
    partA: matchInfo.firstHalfScore.team2,
    partB: matchInfo.secondHalfScore.team2,
  },
});

export const getRanking = (state) => {
  return {
    ...state.ranking,
    data: state.ranking.data.map(parseRanking).sort((a, b) => b.rank - a.rank),
  };
};

export const parseRanking = (player, index) => {
  const rank = (player.score / player.rounds).toFixed(3);
  return {
    ...player,
    position: index + 1,
    kills: `${(player.kills / player.rounds).toFixed(3)} (${player.kills})`,
    deaths: `${(player.deaths / player.rounds).toFixed(3)} (${player.deaths})`,
    assists: `${(player.assists / player.rounds).toFixed(3)} (${
      player.assists
    })`,
    headshotKills: `${(player.headshotKills / player.rounds).toFixed(3)} (${
      player.headshotKills
    })`,
    mvps: `${(player.mvps / player.rounds).toFixed(3)} (${player.mvps})`,
    rank: rank,
    rankText: `${rank} (${player.score})`,
  };
};
