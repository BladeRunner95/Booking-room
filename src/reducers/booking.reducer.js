import {actionTypes} from "../types/booking.types";
import Cookies from "js-cookie";
import moment from "moment";


const filters = Cookies.get('filters') && JSON.parse(Cookies.get('filters'))

export let initialState = filters? filters: {
    startDate: moment().valueOf(),
    finishDate: undefined,
    // totalCost: null,
    timeDuration: null,
    location: ["Tel-Aviv"]
}

export const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GETBOOKINGDETAILS:
            return {...state};

        case actionTypes.SETSTARTDATE:
            return {
                ...state,
                startDate: action.selectedDate
            };

        case actionTypes.SETSTARTFINISHDATE:
            const getStartDate = new Date(action.selectedDate);
            const calculateFinishDate = new Date(getStartDate.setHours((getStartDate.getHours() + state.timeDuration))).getTime();
            return {
                ...state,
                startDate: action.selectedDate,
                finishDate: calculateFinishDate
            }

        case actionTypes.SETTIMESTART:
            return {
                ...state,
                startDate: new Date(new Date(state.startDate).setHours(action.selectedTime)).getTime(),
                time: action.selectedTime
            };

        case actionTypes.SETDURATION:
            // 39: might be redundant
            const startDateCloned = new Date(state.startDate);
            const newFinishDate = new Date(startDateCloned.setHours((startDateCloned.getHours() + action.selectedDuration))).getTime();
            const updateTotalCost = action.selectedDuration * 125;
            return {
                ...state,
                finishDate: newFinishDate,
                totalCost: updateTotalCost,
                timeDuration: action.selectedDuration
            };

        case actionTypes.CHANGESTARTFINISHTIME:
            const newStartDate = new Date(new Date(state.startDate).setHours(action.selectedTime)).getTime();
            const updatedFinishDate = new Date(new Date(newStartDate).setHours((action.selectedTime + state.timeDuration))).getTime();
            return {
                ...state,
                startDate: newStartDate,
                finishDate: updatedFinishDate,
                time: action.selectedTime
            }

        case actionTypes.FULLUPDATESTATE:
            return {
                ...state,
                startDate: action.newState.startDate,
                finishDate: action.newState.finishDate,
                totalCost: action.newState.totalCost,
                time: action.newState.time,
                timeDuration: action.newState.timeDuration,
            }
        default :
            return state;
    }
};