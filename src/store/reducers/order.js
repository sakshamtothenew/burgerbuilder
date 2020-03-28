import * as actionTypes from '../actions/actionsTypes'
import reducer from './BurgerBuilder'

const initialData = {

    orders : [] , 
    loading : false ,
    puchased : false 
}


const reducers = (state = initialData , actions) => {
    const newOrder = {
        ...actions.orderData ,

          id : actions.orderid
    }
      switch(actions.type) {

        
        case (actionTypes.PURCHASE_SUCCESS) : 
         return  {
             ...state , 
             loading : false ,
             orders : state.orders.concat(newOrder)
         } 

         case (actionTypes.PURCHASE_FAIL) :
             return {
                 ...state ,
                 loading : false
             }
            
          case (actionTypes.PURCHASE_START) :
              return {
                  ...state , 
                  loading : true
              }
         case (actionTypes.FETCH_ORDERS_START) : 
           return {
               ...state ,
               loading : true 
           }  
         case (actionTypes.FETCH_ORDERS_SUCCESS) : 
            return {
                ...state , 
                orders : actions.orders ,
                loading : false
            } 
        case (actionTypes.FETCH_ORDERS_FAIL) :
            return {
                ...state , 
                loading : false
            }
            default :
             return state 
      }
}

export default reducers