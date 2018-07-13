import * as actions from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const authStart = (state, action) => {
    return updateObject( state, { error: null, loading: true });
}

const authSuccess = (state, action) => {
    return updateObject( state, { 
        token: action.idToken,
        userId : action.userId,
        error: null,
        loading: false
    } );
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.AUTH_START: return authStart(state, action);
        case actions.AUTH_SUCCESS: return authSuccess(state, action);
        case actions.AUTH_FAIL: return authFail(state,)
        default: return state;
    }
}

export default reducer;