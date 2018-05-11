import {
  START_LOADING,
  UPDATE_KEY,
  UPDATE_RESULTS,
  UPDATE_ERROR,
} from "../actions/dictionary";

const initialState = {
  items: [],
  
  isLoading: false,
  error: null,
  key: "",
};

export default function dictionary(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ERROR: {
      return Object.assign({}, state, {
        items: [],
        isLoading: false,
        error: action.message,
      });
    }
    case UPDATE_RESULTS:
      return Object.assign({}, state, {
        items: action.items,
        isLoading: false,
      });

    case START_LOADING:
      return Object.assign({}, state, {
        items: [],
        isLoading: true,
      });

    case UPDATE_KEY:
      return Object.assign({}, state, {
        key: action.key,
      });

    default:
      return state;
  }
}
