import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer";

const composedEnhancers = composeWithDevTools();
const store = configureStore({ reducer: rootReducer }, composedEnhancers);
export default store;
