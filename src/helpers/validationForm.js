import {alertActions} from "../actions/alert.actions";
import {userActions} from "../actions/user.actions";

const validForm = (email, password) => {
    if (!/\S+@\S+\.\S+/.test(email)) {
        dispatch(alertActions.error({
            type: 'email',
            message: 'Please enter a valid email address'
        }));
        return;
    }
    if (password.length < 5 || !password.trim()) {
        dispatch(alertActions.error({
            type: 'password',
            message: 'Please enter a valid password (more than 5 symbols)'
        }));
    } else {
        dispatch(userActions.login(email, password));
    }
}