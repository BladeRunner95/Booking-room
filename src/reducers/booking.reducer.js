import {actionTypes} from "../types/booking.types";


export let initialState = {
    startDate: new Date(new Date().setHours(13, 0, 0, 0)),
    finishDate: undefined,
    totalCost: null,
    time: 13,
    timeDuration: null,
    location: ['Tel-Aviv']
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
            const getStartDate = new Date(action.selectedDate.getTime());
            getStartDate.setHours((action.selectedDate.getHours() + state.timeDuration));
            return {
                ...state,
                startDate: action.selectedDate,
                finishDate: getStartDate
            }

        case actionTypes.SETTIMESTART:
            return {
                ...state,
                startDate: new Date(state.startDate.setHours(action.selectedTime)),
                time: action.selectedTime
            };
        case actionTypes.SETDURATION:
            const startDateCloned = new Date(state.startDate.getTime());
            const newFinishDate = new Date(startDateCloned.setHours((state.startDate.getHours() + action.selectedDuration)));
            const updateTotalCost = action.selectedDuration * 125;
            return {
                ...state,
                finishDate: newFinishDate,
                totalCost: updateTotalCost,
                timeDuration: action.selectedDuration
            };
        case actionTypes.CHANGESTARTFINISHTIME:
            const updatedFinishDate = new Date(state.startDate.getTime());
            const newStartDate = new Date(state.startDate.setHours(action.selectedTime));
            updatedFinishDate.setHours((state.startDate.getHours() + state.timeDuration));
            return {
                ...state,
                startDate: newStartDate,
                finishDate: updatedFinishDate,
                time: action.selectedTime
            }
        default :
            return state;
    }
};