import * as actionTypes  from './actionsTypes'

import axios from 'axios'
export const authstart = () => {
    return {
        type : actionTypes.AUTH_START ,

    }
}

export const authsuccess = (userid , token) => {

    return {
        type : actionTypes.AUTH_SUCCESS ,
        token : token , 
        userid : userid
    }
} 

export const authfail = (error) => {
    return {
        type : actionTypes.AUTH_FAIL ,
        error : error 
    }
}

export const authlogout = () => {
    return {
        type : actionTypes.AUTH_LOGOUT 
    }
}

export const expirelogout = (expiringTime) =>{
    
      return dispatch => {
          
        setTimeout(() => {
            dispatch(authlogout())
      } , expiringTime)
    }
}


export const auth = (email , password , isSignup) => {
      return dispatch => {
          dispatch(authstart());
          const authobj = {
              email : email , 
              password : password , 
              returnSecureToken : true 
          }
          let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAFbhUi0QB2Tcgoh1dBs9jsh3uMXICIk9s'
          console.log("this is from action " , isSignup)
          if(isSignup)
          {
              url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAFbhUi0QB2Tcgoh1dBs9jsh3uMXICIk9s'
              
          }

          axios.post( url , authobj)
          .then(response => {
              console.log(response.data)
              dispatch(authsuccess(response.data.localId , response.data.idToken ))
            dispatch(expirelogout(response.data.expiresIn))
          })
          .catch(err =>{
               console.log(err) 
               dispatch(authfail(err))
          })
      }
}

