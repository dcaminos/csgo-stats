export const getPlayers = (state) => {
  if (state.firestore.data._users === undefined) {
    return undefined;
  }

  return Object.keys(state.firestore.data._users || [])
    .map((userId) => {
      const user = state.firestore.data._users[userId];
      return {
        id: user.id,
        name: user.name,
        rank: user.score / user.rounds,
        online: user.online || false,
      };
    })
    .sort((a, b) => b.rank - a.rank);
};

export const getPlayersBalanced = (state) => {
  if (
    state.firestore.data._ranks === undefined ||
    state.firestore.data._config === undefined ||
    state.firestore.data._users === undefined
  ) {
    return undefined;
  }

  if (state.firestore.data._config.items === undefined) {
    return undefined;
  }

  const ranks = state.firestore.data._ranks;
  const rankList = state.firestore.data._config.items.ranks;
  const users = state.firestore.data._users;

  if (Object.keys(ranks).length < 2) {
    return undefined;
  }
  const lastRank = ranks[rankList[rankList.length - 1]];
  const previousRank = ranks[rankList[rankList.length - 2]];

  return getMergedData(previousRank, lastRank, users);
};

const getMergedData = (previousRank, lastRank, users) => {
  const mapResult = lastRank.users.concat(previousRank.users).reduce((result, item) => {
    let newItem = Object.assign({}, item);
    newItem.assists = parseInt(newItem.assists, 10);
    newItem.deaths = parseInt(newItem.deaths, 10);
    newItem.headshots = parseInt(newItem.headshots, 10);
    newItem.kills = parseInt(newItem.kills, 10);
    newItem.matches = parseInt(newItem.matches, 10);
    newItem.rounds = parseInt(newItem.rounds, 10);
    newItem.score = parseInt(newItem.score, 10);
    if (result[newItem.id]) {
      result[newItem.id].assists += newItem.assists;
      result[newItem.id].deaths += newItem.deaths;
      result[newItem.id].headshots += newItem.headshots;
      result[newItem.id].kills += newItem.kills;
      result[newItem.id].matches += newItem.matches;
      result[newItem.id].rounds += newItem.rounds;
      result[newItem.id].score += newItem.score;
    } else {
      result[newItem.id] = newItem;
    }
    return result;
  }, {});

  Object.keys(mapResult).forEach(i => {
    mapResult[i].online = users[i].online;
  });

  return Object.keys(mapResult).map((userId) => {
    const user = mapResult[userId];
    return {
      id: user.id,
      name: user.name,
      rank: user.score / user.rounds,
      online: user.online || false,
    };
  })
  .sort((a, b) => b.rank - a.rank);
};
