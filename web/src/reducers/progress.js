import {
  FETCH_PROGRESS_ERROR,
  FETCH_PROGRESS_PENDING,
  FETCH_PROGRESS_SUCCESS,
  CHANGE_INDICATOR,
} from "../actions/progress";

const initialState = {
  indicators: {
    selectedId: "score",
    options: ["score"],
  },
  isLoading: false,
  error: null,
  data: [],
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_INDICATOR:
      return {
        ...state,
        indicators: {
          ...state.indicators,
          selectedId: action.payload,
        },
      };
    case FETCH_PROGRESS_PENDING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_PROGRESS_SUCCESS:
      return {
        data: action.payload.players,
        indicators: { ...state.indicators, options: action.payload.indicators },
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
