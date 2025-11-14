import { createStore, combineReducers } from "redux";

// Example reducer (you can replace later)
const initialState = { theme: "dark" };

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_THEME":
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  theme: themeReducer,
});

const store = createStore(rootReducer);

export default store;
