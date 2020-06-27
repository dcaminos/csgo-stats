import {
  FETCH_RANKING_ERROR,
  FETCH_RANKING_PENDING,
  FETCH_RANKING_SUCCESS,
} from "../actions/ranking";

const initialState = {
  isLoading: false,
  error: null,
  data: [],
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RANKING_PENDING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_RANKING_SUCCESS:
      return {
        data: action.payload,
        isLoading: false,
        error: null,
      };
    case FETCH_RANKING_ERROR:
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
