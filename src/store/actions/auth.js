import * as actions from './actionTypes';
import axios from '../../axios-orders';


export const authStart = () => {
    return {
        type: actions.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actions.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actions.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    return {
        type: actions.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const API_KEY = 'AIzaSyBeERam-eIC-fNg_l5wPgb-P9RD-EMgtlA';
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;
        if(!isSignup) {
            url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`;
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            })
    }
}