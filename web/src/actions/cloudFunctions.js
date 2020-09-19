export const FETCH_START_SERVER_PENDING = "FETCH_START_SERVER_PENDING";
export const FETCH_START_SERVER_SUCCESS = "FETCH_START_SERVER_SUCCESS";
export const FETCH_START_SERVER_ERROR = "FETCH_START_SERVER_ERROR";

let API_URL = "https://us-central1-csgo-stats-457a9.cloudfunctions.net/";
/*if (process.env.NODE_ENV === "development") {
  API_URL = "http://localhost:5001/csgo-stats-457a9/us-central1/";
}*/

const CHECK_SERVER_STATUS = "checkServerStatus";
const START_SERVER = "startServer";
const SET_TEAMS = "setTeams";
const SET_CONFIG = "setConfig";
const SET_BOTS = "setBots";
const STARTING_SERVER_TIMEOUT = 40000;

function fetchStartServerPending() {
  return {
    type: FETCH_START_SERVER_PENDING,
  };
}

function fetchStartServerSuccess() {
  return {
    type: FETCH_START_SERVER_SUCCESS,
  };
}

function fetchStartServerError(error) {
  return {
    type: FETCH_START_SERVER_ERROR,
    payload: error,
  };
}

export const checkServerStatus = () => {
  return async (dispatch) => {
    const url = new URL(API_URL + CHECK_SERVER_STATUS);
    fetch(url);
  };
};

export const startServer = () => {
  return async (dispatch) => {
    dispatch(fetchStartServerPending());
    const url = new URL(API_URL + START_SERVER);
    setTimeout(() => {
      dispatch(checkServerStatus());
      dispatch(fetchStartServerSuccess());
    }, STARTING_SERVER_TIMEOUT);

    fetch(url)
      .then(() => {
        dispatch(fetchStartServerSuccess());
      })
      .catch((error) => {
        dispatch(fetchStartServerError(error));
      });
  };
};

export const setTeams = (teamA, teamB) => {
  return async (dispatch) => {
    const url = new URL(API_URL + SET_TEAMS);
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ teamA: teamA, teamB: teamB }),
    });
  };
};

export const setConfig = (config) => {
  return async (dispatch) => {
    const url = new URL(API_URL + SET_CONFIG);
    fetch(url, {
      method: "POST",
      body: JSON.stringify(config),
    });
  };
};

export const setBots = (config) => {
  return async (dispatch) => {
    const url = new URL(API_URL + SET_BOTS);
    fetch(url, {
      method: "POST",
      body: JSON.stringify(config),
    });
  };
};
