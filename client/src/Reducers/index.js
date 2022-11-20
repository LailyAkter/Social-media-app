import { combineReducers } from "redux";
import AuthReducer from "./AuthReducers";
import postReducer from "./PostReducers";

export const reducers = combineReducers({AuthReducer,postReducer})