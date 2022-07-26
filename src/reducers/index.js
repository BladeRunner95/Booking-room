import {combineReducers} from "redux";
import {myReducer} from "./booking.reducer";
import {userReducer} from "./user.reducer";
import {signupReducer} from "./signup.reducer";
import {alertReducer} from "./alert.reducer";


export const rootReducer = combineReducers({
    myReducer,
    userReducer,
    signupReducer,
    alertReducer
})