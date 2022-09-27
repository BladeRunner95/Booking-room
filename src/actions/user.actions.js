import {actionTypes} from "../types/user.types";
import axios from "axios";
import {alertActions} from "./alert.actions";

export const userActions = {
    login,
    logout,
    register,
    forgot,
    resetPas,
    // getUsers,
    // getUser,
    // updateUser,
    // delete: _delete
}

function login(email, password, remember= false, from) {
    return async dispatch => {
        try {
            dispatch(request({email}));
            const user = await axios.post('http://localhost:5000/api/auth/login',
                {
                    email,
                    password,
                    remember
                }, {withCredentials: true}, {credentials: 'include'})

            dispatch(success(user.data));
            localStorage.setItem('user', user.data._id);
            if (user.data.isAdmin) {
                localStorage.setItem('admin', user.data.isAdmin);
            }
        } catch (e) {
            dispatch(failure(e));
            console.log(e.response.data)
            dispatch(alertActions.error(e.response.data));
        }
    };

    function request(user) { return { type: actionTypes.LOGIN_REQUEST, user } }
    function success(user) { return { type: actionTypes.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: actionTypes.LOGIN_FAILURE, error } }
}


function logout() {
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem('user');
    if (localStorage.getItem('admin')) {
        localStorage.removeItem('admin');
    }
    return { type: actionTypes.LOGOUT };
}

function register(user) {
    return async dispatch => {
        try {
            dispatch(request(user));
            const newUser = await axios.post('http://localhost:5000/api/auth/users', user);
            dispatch(success(newUser));
            console.log('Register success')
        } catch (e) {
            dispatch(failure(e));
            console.log(e);
            dispatch(alertActions.error(e.response.data));
        }

        // userService.register(user)
        //     .then(
        //         user => {
        //             dispatch(success());
        //             history.push('/login');
        //             // dispatch(alertActions.success('Registration successful'));
        //         },
        //         error => {
        //             dispatch(failure(error));
        //             // dispatch(alertActions.error);
        //         }
        //     );
    };

    function request(user) { return { type: actionTypes.REGISTER_REQUEST, user } }
    function success(user) { return { type: actionTypes.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: actionTypes.REGISTER_FAILURE, error } }
}



function forgot(email, from) {
    return async dispatch => {
        try {
            dispatch(request({email}));
            const user = await axios.post('http://localhost:5000/api/auth/forgot',
                {
                    email
                })
            //send res.message to forgot password screen and disable input
            dispatch(success());
            dispatch(alertActions.success(user.data.message));
        } catch (e) {
            dispatch(failure());
            if (e.response.status === 400 || 422) {
                dispatch(alertActions.error(e.response.data));
            }
        }
    };

    function request() { return { type: actionTypes.FORGOT_REQUEST }}
    function success() { return { type: actionTypes.FORGOT_SUCCESS }}
    function failure() { return { type: actionTypes.FORGOT_FAILURE }}
}

function resetPas(password, id, from) {
    return async dispatch => {
        try {
            dispatch(request({password, id}));
            const user = await axios.post(`http://localhost:5000/api/auth/resetPas/${id}`,
                {
                    password
                }, {withCredentials: true}, {credentials: 'include'})
            //send res.message to forgot password screen and disable input
            dispatch(success(user.data));
            localStorage.setItem('user', user.data._id);
            dispatch(alertActions.success(user.data.message));
        } catch (e) {
            dispatch(failure(e));
            if (e.response.status === 400 || 422) {
                dispatch(alertActions.error(e.response.data));
            }
        }
    };

    function request(user) { return { type: actionTypes.RESET_REQUEST, user } }
    function success(user) { return { type: actionTypes.RESET_SUCCESS, user } }
    function failure(error) { return { type: actionTypes.RESET_FAILURE, error } }
}

// function getAll() {
//     return dispatch => {
//         dispatch(request());
//
//         userService.getAll()
//             .then(
//                 users => dispatch(success(users)),
//                 error => dispatch(failure(error.toString()))
//             );
//     };
//
//     function request() { return { type: userConstants.GETALL_REQUEST } }
//     function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
// }
//
// function _delete(id) {
//     return dispatch => {
//         dispatch(request(id));
//
//         userService.delete(id)
//             .then(
//                 user => dispatch(success(id)),
//                 error => dispatch(failure(error.toString()))
//             );
//     };
//
//     function request (id) { return { type: userConstants.DELETE_REQUEST, id } }
//     function success (id) { return { type: userConstants.DELETE_SUCCESS, id } }
//     function failure (id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
// }