import {actionTypes} from "../types/booking.types";

export const allActions = {
    setStartDate,
    setStartFinishDate,
    setTimeStart,
    changeStartFinishTime,
    setDuration,
    fullUpdateState
}


function setStartDate(selectedDate) {
    return {type: actionTypes.SETSTARTDATE, selectedDate}
}


function setStartFinishDate(selectedDate) {
    return {type: actionTypes.SETSTARTFINISHDATE, selectedDate}
}

function setTimeStart(selectedTime) {
    return {type: actionTypes.SETTIMESTART, selectedTime}
}

function setDuration(selectedDuration) {
    return { type: actionTypes.SETDURATION, selectedDuration}
}

function changeStartFinishTime(selectedTime) {
    return { type: actionTypes.CHANGESTARTFINISHTIME, selectedTime}
}

function fullUpdateState(newState) {
    return { type: actionTypes.FULLUPDATESTATE, newState}
}