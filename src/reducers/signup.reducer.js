import { actionTypes } from "../types/user.types";

export const signupReducer = (state={}, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_REQUEST:
            return { registering: true };
        case actionTypes.REGISTER_SUCCESS:
            return { registered: true };
        case actionTypes.REGISTER_FAILURE:
            return {};
        default:
            return state;
    }
}