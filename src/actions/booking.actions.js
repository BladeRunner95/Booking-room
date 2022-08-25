import {actionTypes} from "../types/booking.types";

export const allActions = {
    setStartDate,
    setStartFinishDate,
    setFinishDate,
    fullUpdateState
}


function setStartDate(selectedDate) {
    return {type: actionTypes.SETSTARTDATE, selectedDate}
}


function setStartFinishDate(selectedDate, newFinishDate) {
    return {type: actionTypes.SETSTARTFINISHDATE, selectedDate, newFinishDate}
}

function setFinishDate(startDate, selectedDuration) {
    return { type: actionTypes.SETFINISHDATE, startDate, selectedDuration}
}

function fullUpdateState(newState) {
    return { type: actionTypes.FULLUPDATESTATE, newState}
}