import { combineReducers } from "redux";
import profileReducer from "./reducers/profileReducer";

const rootReducer = combineReducers({
  profile: profileReducer,
});

export default rootReducer;
