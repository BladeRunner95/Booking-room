import {createStore, combineReducers} from "redux";
import {useSelector} from "react-redux";

export const allActions = {
    myAction,
    setStartDate,
    setStartFinishDate,
}

function myAction () {
    return dispatch => {
        dispatch( ()=> { return { type: actionTypes.GETBOOKINGDETAILS }});
    }
}

function setStartDate (selectedDate) {
    return { type: actionTypes.SETSTARTDATE, selectedDate }
}


function setStartFinishDate (selectedDate, startDateCloned) {
    return { type: actionTypes.SETSTARTFINISHDATE, selectedDate, startDateCloned}
}

export const actionTypes = {
    GETBOOKINGDETAILS: 'USERS_GETBOOKINGDETAILS',
    SETSTARTDATE: 'USERS_SETSTARTDATE',
    SETSTARTFINISHDATE: 'USERS_SETSTARTFINISHDATE'
}

let initialState = {
    startDate: new Date(new Date().setHours(13, 0, 0, 0)),
    finishDate: undefined,
    totalCost: null
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
            return {
                ...state,
                startDate: action.startDate,
                finishDate: action.finishDate

            }
        default :
            return state;
    }
};
const rootReducer = combineReducers( {
    myReducer
})

export let store = createStore(rootReducer);