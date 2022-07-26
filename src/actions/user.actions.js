import {actionTypes} from "../types/user.types";
import axios from "axios";
import {alertActions} from "./alert.actions";


export const userActions = {
    login,
    logout,
    register,
    // getUsers,
    // getUser,
    // updateUser,
    // delete: _delete
}

function login(username, password, from) {
    return async dispatch => {
        try {
            dispatch(request({username}));
            const user = await axios.post('http://localhost:5000/api/auth/login',
                {
                    username,
                    password
                }, {withCredentials: true}, {credentials: 'include'})

            dispatch(success(user));
        } catch (e) {
            dispatch(failure(e));
            console.log(e.response.data)
        }
    };

    function request(user) { return { type: actionTypes.LOGIN_REQUEST, user } }
    function success(user) { return { type: actionTypes.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: actionTypes.LOGIN_FAILURE, error } }
}


function logout() {
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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