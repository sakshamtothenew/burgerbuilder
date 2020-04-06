import * as actionTypes from './actionsTypes'

import axios from 'axios'
export const authstart = () => {
    return {
        type: actionTypes.AUTH_START,

    }
}

export const authsuccess = (userid, token) => {

    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userid: userid
    }
}
export const authredirectpath = (redirectingpath) => {

    return {
        type: actionTypes.AUTH_REDIRECT_PATH,
        redirectingpath: redirectingpath
    }
}
export const authfail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authlogout = () => {
    localStorage.removeItem('USER_TOKEN')
    localStorage.removeItem('EXPIRING_TIME')
    localStorage.removeItem('USERID')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const expirelogout = (expiringTime) => {
    expiringTime *= 1000;
    console.log(expiringTime)
    console.log('this is called')
    return dispatch => {

        setTimeout(() => {
            dispatch(authlogout())
        }, expiringTime)
    }
}


export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authstart());
        const authobj = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAFbhUi0QB2Tcgoh1dBs9jsh3uMXICIk9s'
        console.log("this is from action ", isSignup)
        if (isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAFbhUi0QB2Tcgoh1dBs9jsh3uMXICIk9s'

        }

        axios.post(url, authobj)
            .then(response => {
                console.log(response.data)
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

                localStorage.setItem('USER_TOKEN', response.data.idToken)
                localStorage.setItem('EXPIRING_TIME', expirationDate)
                localStorage.setItem('USERID', response.data.localId)
                dispatch(authsuccess(response.data.localId, response.data.idToken))
                dispatch(expirelogout(response.data.expiresIn))
            })
            .catch(err => {
                console.log(err.response.data)
                dispatch(authfail(err.response.data.error))
            })
    }
}
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('USER_TOKEN');
        console.log("this is token", token)
        if (!token) {

            dispatch(authlogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('EXPIRING_TIME'));
            console.log("this is expiring time befaore auth suucc ", expirationDate)
            if (expirationDate <= new Date()) {

                dispatch(authlogout());
                console.log('pass')
            } else {
                const userId = localStorage.getItem('USERID');
                dispatch(authsuccess(userId, token));
                dispatch(expirelogout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};

