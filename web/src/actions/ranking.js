export const FETCH_RANKING_PENDING = "FETCH_RANKING_PENDING";
export const FETCH_RANKING_SUCCESS = "FETCH_RANKING_SUCCESS";
export const FETCH_RANKING_ERROR = "FETCH_RANKING_ERROR";

const API_URL =
  "https://us-central1-csgo-stats-457a9.cloudfunctions.net/ranking";

function fetchRankingPending() {
  return {
    type: FETCH_RANKING_PENDING,
  };
}

function fetchRankingSuccess(players) {
  return {
    type: FETCH_RANKING_SUCCESS,
    payload: players,
  };
}

function fetchRankingError(error) {
  return {
    type: FETCH_RANKING_ERROR,
    payload: error,
  };
}

export const fetchRankingAction = () => {
  return async (dispatch) => {
    dispatch(fetchRankingPending());

    const url = new URL(API_URL);
    fetch(url)
      .then((res) => res.json())
      .then((players) => {
        dispatch(fetchRankingSuccess(players));
      })
      .catch((error) => {
        dispatch(fetchRankingError(error));
      });
  };
};
