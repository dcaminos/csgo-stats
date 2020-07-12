export const getPlayers = (state) => {
  if (state.firestore.data._users === undefined) {
    return undefined;
  }

  return Object.keys(state.firestore.data._users)
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
