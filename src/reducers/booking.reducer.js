import {actionTypes} from "../types/booking.types";
import Cookies from "js-cookie";
import moment from "moment";


const filters = Cookies.get('filters') && JSON.parse(Cookies.get('filters'))

export let initialState = filters? filters: {
    startDate: moment().valueOf(),
    finishDate: undefined,
    timeDuration: null,
    location: ["Tel-Aviv"]
}

export const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SETSTARTDATE:
            return {
                ...state,
                startDate: action.selectedDate
            };

        case actionTypes.SETSTARTFINISHDATE:
            return {
                ...state,
                startDate: action.selectedDate,
                finishDate: action.newFinishDate
            }


        case actionTypes.SETFINISHDATE:
            return {
                ...state,
                finishDate: action.startDate,
                // totalCost: updateTotalCost,
                timeDuration: action.selectedDuration
            };

        case actionTypes.FULLUPDATESTATE:
            return {
                ...state,
                startDate: action.newState.startDate,
                finishDate: action.newState.finishDate,
                totalCost: action.newState.totalCost,
                timeDuration: action.newState.timeDuration,
            }
        default :
            return state;
    }
};