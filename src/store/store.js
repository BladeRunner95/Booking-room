import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";
import {rootReducer} from "../reducers";
import {loadState, saveState} from "../localStorage/localStorage";
import throttle from 'lodash.throttle';


const persistedState = loadState();

export let store = createStore(
    rootReducer,
    persistedState,
    composeWithDevTools(
        applyMiddleware(
            thunkMiddleware
        )
    ));

store.subscribe(throttle(()=> {
    saveState({
        locations: store.getState().myReducer
    })
}, 1000));