import {required, email} from "react-admin";

const number = (message = 'Must be a number') =>
    value => value && isNaN(Number(value)) ? message : undefined;

const password = (message = 'Must be longer than 4 symbols') =>
    value => (value.length < 5 || !value.trim())? message : undefined;

export const validatePrice = [required(), number()];
export const validateRequired = [required()];
export const validateEmail = [required(), email()];
export const validatePassword = [required(), password()];