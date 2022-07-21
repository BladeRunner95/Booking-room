import {combineReducers} from "redux";
import {myReducer} from "./booking.reducer";
import {userReducer} from "./user.reducer";

export const rootReducer = combineReducers({
    myReducer,
    userReducer
})