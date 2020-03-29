import * as actionTypes from '../actions/actionsTypes'


const initialstate = {
    token : null , 
    userid : null , 
    error   : null , 
    loading :  false , 
    authredirectpath : null 
}


const reducer = (state  = initialstate , action) => {

      switch(action.type) {
          case (actionTypes.AUTH_START) :
              return {
                  ...state , 
                  loading : true,
                  error : null
              } 
            case (actionTypes.AUTH_LOGOUT) : 
              return {
                  ...state , 
                  token : null ,
                  userid : null 
              }
          case (actionTypes.AUTH_SUCCESS) : 
          return {
              ...state ,
              loading : false , 
               token : action.token ,
               userid : action.userid
          }  
            case (actionTypes.AUTH_REDIRECT_PATH) :
                return {
                    ...state , 
                    authredirectpath : action.redirectingpath
                }
          case (actionTypes.AUTH_FAIL) : 
                return {
                    ...state , 
                    loading : false , 
                    error : action.error
                }

            default :
            return state
      }
}

export default reducer