import {required, email} from "react-admin";
import moment from "moment";

const number = (message = 'Must be a number') =>
    value => value && isNaN(Number(value)) ? message : undefined;

const password = (message = 'Must be longer than 4 symbols') =>
    value => (value.length < 5 || !value.trim())? message : undefined;

export const isAfterStart = (values) => {
    const errors = {};
    if (moment(values.finishDate).isSameOrBefore(moment(values.startDate))) {
        errors.finishDate = 'Finish date can not be equal or later than start date'
    }
    return errors;
};

export const validatePrice = [required(), number()];
// export const validateDate = [required(), isAfterStart()];
export const validateRequired = [required()];
export const validateEmail = [required(), email()];
export const validatePassword = [required(), password()];