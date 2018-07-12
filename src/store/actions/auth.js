import * as actions from './actionTypes';
import axios from '../../axios-orders';


export const authStart = () => {
    return {
        type: actions.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actions.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (error) => {
    return {
        type: actions.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const API_KEY = 'AIzaSyBeERam-eIC-fNg_l5wPgb-P9RD-EMgtlA';
        const authData = {
            email: email,
            password: password,
            resturnSecureToken: true
        }
        axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data))
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err))
            })
    }
}