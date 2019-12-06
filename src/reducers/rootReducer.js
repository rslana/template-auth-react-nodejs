import { combineReducers } from "redux";
import user from "./userReducer";
import ingrediente from "./ingredienteReducer";

const reducers = combineReducers({
  user,
  ingrediente
});

export default reducers

