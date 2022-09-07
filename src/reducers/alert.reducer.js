import {alertTypes} from "../types/alert.types";

export const alertReducer = (state = {}, action) => {
    switch (action.type) {
        case alertTypes.SUCCESS :
            return {
                type: 'text-success',
                message: action.message
            };
        case alertTypes.ERROR:
            return {
                type: 'text-danger',
                message: action.message
            };
        case alertTypes.CLEAR:
            return {};
        default:
            return state
    }
}