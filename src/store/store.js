import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
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
            thunk
        )
    ));

store.subscribe(throttle(()=> {
    saveState({
        locations: store.getState().myReducer,
        // user: store.getState().userReducer
    })
}, 1000));