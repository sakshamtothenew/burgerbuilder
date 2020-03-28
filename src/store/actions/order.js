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


export const fetchOrdersSuccess = ( orders ) => {
    return {
        type: actionType.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = ( error ) => {
    return {
        type: actionType.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionType.FETCH_ORDERS_START
    };
};

export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get( '/orders.json?auth=' + token )
            .then( res => {
                const fetchedOrders = [];
                for ( let key in res.data ) {
                    fetchedOrders.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            } )
            .catch( err => {
                dispatch(fetchOrdersFail(err));
            } );
    };
};



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
