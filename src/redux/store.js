import { applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";
import { legacy_createStore as createStore } from "redux";

export default createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, createLogger())
);
