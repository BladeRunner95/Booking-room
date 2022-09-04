import {actionTypes} from "../types/user.types";
import {getCookie} from "../helpers/helpers";

let user = getCookie("access_token");


const initialState = user ? { loggedIn: true } : {};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST :
            return {
                loggingIn: true,
                user: action.user
            };
        case actionTypes.LOGIN_SUCCESS :
            return {
                loggedIn: true,
                user: action.user
            };
        case actionTypes.LOGIN_FAILURE:
            return {};
        case actionTypes.LOGOUT:
            return {};
        case actionTypes.FORGOT_REQUEST:
            return {
                loading: true
            };
        case actionTypes.FORGOT_SUCCESS:
            return {
                sent: true
            };
        case actionTypes.FORGOT_FAILURE:
            return {};
        default :
            return state;
    }
}