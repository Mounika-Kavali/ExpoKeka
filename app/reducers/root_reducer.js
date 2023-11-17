import { combineReducers } from "redux";
import loginReducer from "./login_reducer";

const rootReducer = combineReducers({
  boolValue: loginReducer,
});

export default rootReducer;
