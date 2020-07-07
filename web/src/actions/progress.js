export const FETCH_PROGRESS_PENDING = "FETCH_PROGRESS_PENDING";
export const FETCH_PROGRESS_SUCCESS = "FETCH_PROGRESS_SUCCESS";
export const FETCH_PROGRESS_ERROR = "FETCH_PROGRESS_ERROR";
export const CHANGE_INDICATOR = "CHANGE_INDICATOR";

const API_URL =
  "https://us-central1-csgo-stats-457a9.cloudfunctions.net/progress";

function fetchProgressPending() {
  return {
    type: FETCH_PROGRESS_PENDING,
  };
}

function changeIndicator(indicatorId) {
  return {
    type: CHANGE_INDICATOR,
    payload: indicatorId,
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

export const changeIndicatorAction = (indicatorId) => {
  return async (dispatch) => {
    dispatch(changeIndicator(indicatorId));
  };
};

export const fetchProgressAction = () => {
  return async (dispatch) => {
    dispatch(fetchProgressPending());

    const url = new URL(API_URL);
    fetch(url)
      .then((res) => res.json())
      .then((players) => {
        const indicators =
          players.length > 0 && players[0].data.length > 0
            ? Object.keys(players[0].data[0]).filter(
                (key) => !["id", "name", "timestamp"].includes(key)
              )
            : [];

        dispatch(fetchProgressSuccess({ indicators, players }));
      })
      .catch((error) => {
        dispatch(fetchProgressError(error));
      });
  };
};
