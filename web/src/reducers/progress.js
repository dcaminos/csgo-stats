import {
  FETCH_PROGRESS_ERROR,
  FETCH_PROGRESS_PENDING,
  FETCH_PROGRESS_SUCCESS,
} from "../actions/progress";

const initialState = {
  isLoading: false,
  error: null,
  data: [],
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROGRESS_PENDING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_PROGRESS_SUCCESS:
      console.log("FETCH_PROGRESS_SUCCESS", action);
      return {
        data: action.payload,
        isLoading: false,
        error: null,
      };
    case FETCH_PROGRESS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default newsReducer;
