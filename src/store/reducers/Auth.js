import * as actionTypes from '../actions/actionsTypes'
import {updateObj }from '../../shared/Utility'

const initialstate = {
    token: null,
    userid: null,
    error: null,
    loading: false,
    authredirectpath: '/'
}


const reducer = (state = initialstate, action) => {
  console.log("state" , state)
    switch (action.type) {
        case (actionTypes.AUTH_START): return updateObj(state, { loading: true, error: null })
        case (actionTypes.AUTH_LOGOUT): return updateObj(state, { token: null, userid: null })
        case (actionTypes.AUTH_SUCCESS): return updateObj(state, { loading: false, token: action.token, userid: action.userid })
        case (actionTypes.AUTH_REDIRECT_PATH):console.log("this occurs")
         return updateObj(state, { authredirectpath: action.redirectingpath })
        case (actionTypes.AUTH_FAIL): return updateObj(state, { loading: false, error: action.error })
        default: return state
    }
}

export default reducer