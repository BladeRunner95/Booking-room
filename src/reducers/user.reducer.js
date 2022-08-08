import {actionTypes} from "../types/user.types";

 function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

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
        default :
            return state;
    }
}