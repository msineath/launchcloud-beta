import {csrfFetch} from './csrf';
const LOGIN_USER = '/session/login';
const LOGOUT_USER = '/session/logout';

const loginUser = user => {
    return {type: LOGIN_USER, payload: user};
};

const logoutUser = user => {
    return {type: LOGOUT_USER};
};

export const demoUserLogin = () => async dispatch => {
    const res = await csrfFetch('/api/session/demo');
    const readableRes = await res.json();
    dispatch(loginUser(readableRes.user));
    return res;
};

export const loginThunk = user => async dispatch => {

    const {credential, password} = user;
    
    const res = await csrfFetch('/api/session', {
        'method': 'POST',
        'body': JSON.stringify({credential, password})
    });

    const readableRes = await res.json();

    dispatch(loginUser(readableRes.user));
    return res;
};

export const logoutThunk = user => async dispatch => {
    const res = await csrfFetch('/api/session', {
        method: 'DELETE',
    });

    dispatch(logoutUser());

    return res;
}

export const signupThunk = user => async (dispatch) => {
    const {username, email, password} = user;
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({username, email, password})
    });

    const readableRes = await res.json();
    await dispatch(loginUser(readableRes.user));
    
    return res;
}

export const restoreThunk = async dispatch => {
    const res = await csrfFetch('/api/session');
    const readableRes = await res.json();
    dispatch(loginUser(readableRes.user));
    return res;
}

const initialState = {user: null};

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {

       case LOGIN_USER:
            newState = {...state};
            newState.user = action.payload;
            return newState;
        case LOGOUT_USER:
            return initialState;
        default:
            return state;
    }
}

export default sessionReducer;