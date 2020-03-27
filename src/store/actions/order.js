import * as actionType from '../actions/actionsTypes'
import axios from '../../Axios-instance'

const purchaseSuccessHandler = (id , orderData) => {
   return {
       type : actionType.PURCHASE_SUCCESS ,
       orderid : id , 
       orderData : orderData
   }
}

const purchaseFailedHandler = (error) => {

    return {
        type : actionType.PURCHASE_FAIL ,
        error : error 
    }
}

export const purchaseStartHandler = () => {
    return {
        type :  actionType.PURCHASE_START
    }
}
export const purchaseBurger = (orderData) => {
      
    return dispatch => {
         dispatch(purchaseStartHandler())
         console.log("this is motherfucking orderdata" , orderData)
        axios.post('/orders.json' , orderData)
        .then(Response => {console.log(Response)
         dispatch(purchaseSuccessHandler(Response.data.id , Response.data))
        }) 
        .catch(error => {console.log(error) 
            dispatch(purchaseFailedHandler(error))
        })
    }

}
