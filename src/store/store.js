import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {rootReducer} from "../reducers";

export let store = createStore(
    rootReducer,
    composeWithDevTools());