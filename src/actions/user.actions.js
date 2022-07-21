import {actionTypes} from "../types/user.types";
import axios from "axios";

export const userActions = {
    login,
    logout,
    // register,
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
            //doesn't do it at the same time
            window.location.replace('/');
            console.log(user.headers);
        } catch (e) {
            dispatch(failure(e));
            console.log(
                'there was and error ' + e
            )
        }
        // userService.login(username, password)
        //     .then(
        //         user => {
        //             dispatch(success(user));
        //             history.push(from);
        //         },
        //         error => {
        //             dispatch(failure(error.toString()));
        //             console.log(error.toString());
        //         }
        //     );
    };

    function request(user) { return { type: actionTypes.LOGIN_REQUEST, user } }
    function success(user) { return { type: actionTypes.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: actionTypes.LOGIN_FAILURE, error } }
}


function logout() {
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    return { type: actionTypes.LOGOUT };
}

// function register(user) {
//     return dispatch => {
//         dispatch(request(user));
//
//         userService.register(user)
//             .then(
//                 user => {
//                     dispatch(success());
//                     history.push('/login');
//                     dispatch(alertActions.success('Registration successful'));
//                 },
//                 error => {
//                     dispatch(failure(error));
//                     dispatch(alertActions.error);
//                 }
//             );
//     };
//
//     function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
//     function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
//     function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
// }
//
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