export const FETCH_PROGRESS_PENDING = "FETCH_PROGRESS_PENDING";
export const FETCH_PROGRESS_SUCCESS = "FETCH_PROGRESS_SUCCESS";
export const FETCH_PROGRESS_ERROR = "FETCH_PROGRESS_ERROR";

const API_URL =
  "https://us-central1-csgo-stats-457a9.cloudfunctions.net/progress";

function fetchProgressPending() {
  return {
    type: FETCH_PROGRESS_PENDING,
  };
}

function fetchProgressSuccess(players) {
  return {
    type: FETCH_PROGRESS_SUCCESS,
    payload: players,
  };
}

function fetchProgressError(error) {
  return {
    type: FETCH_PROGRESS_ERROR,
    payload: error,
  };
}

export const fetchProgressAction = () => {
  return async (dispatch) => {
    dispatch(fetchProgressPending());

    const url = new URL(API_URL);
    fetch(url)
      .then((res) => res.json())
      .then((players) => {
        dispatch(fetchProgressSuccess(players));
      })
      .catch((error) => {
        dispatch(fetchProgressError(error));
      });
  };
};
