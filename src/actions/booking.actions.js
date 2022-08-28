import {actionTypes} from "../types/booking.types";

export const allActions = {
    setStartDate,
    setStartFinishDate,
    setFinishDate,
    setTotalCost,
    fullUpdateState,
    defaultState
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

function setTotalCost(totalCost) {
    return { type: actionTypes.SETTOTALCOST, totalCost}
}

function fullUpdateState(newState) {
    return { type: actionTypes.FULLUPDATESTATE, newState}
}

function defaultState() {
    return { type: actionTypes.DEFAULT}
}