import {
  FETCH_START_SERVER_ERROR,
  FETCH_START_SERVER_PENDING,
  FETCH_START_SERVER_SUCCESS,
} from "../actions/cloudFunctions";

const initialState = {
  isLoading: false,
  error: null,
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_START_SERVER_PENDING:
      return {
        isLoading: true,
        error: null,
      };
    case FETCH_START_SERVER_SUCCESS:
      return {
        isLoading: false,
        error: null,
      };
    case FETCH_START_SERVER_ERROR:
      return {
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default newsReducer;
