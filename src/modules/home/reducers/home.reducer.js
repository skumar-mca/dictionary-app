import * as type from "../../../action-types";
const initialState = {
  searchWord: {},
  newSearchAdded: 0
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_SEARCH_WORD: return { ...state, searchWord: action.payload };
    case type.NEW_SEARCH_ADDED: return { ...state, newSearchAdded: state.newSearchAdded + 1 };

    default:
      return state;
  }
};
export default homeReducer;
