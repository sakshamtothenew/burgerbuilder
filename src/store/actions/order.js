import * as actionType from '../actions/actionsTypes'
import axios from '../../Axios-instance'

const purchaseSuccessHandler = (id , orderData) => {
   return {
       type : actionType.PURCHASE_SUCCESS ,
       orderid : id , 
       orderData : orderData ,
    
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

export const purchaseInitHandler = () => {
    return {
        type : actionType.PURCHASE_INIT
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

export const fetchOrders = (token , userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        console.log("this is fetch order action {}{{{{{{{{{{{{{}}}}}}}}}}}}}}{{{{{}}" , userId)
        const queryParams = '?auth=' + token +'&orderBy="userId"&equalTo="' + userId + '"';
        axios.get( '/orders.json' + queryParams )
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



export const purchaseBurger = (orderData , token) => {
      
    return dispatch => {
         dispatch(purchaseStartHandler())
         console.log("this is motherfucking orderdata" , orderData , token)
        axios.post('/orders.json?auth=' + token , orderData)
        .then(Response => {console.log(Response)
         dispatch(purchaseSuccessHandler(Response.data.id , Response.data))
        }) 
        .catch(error => {console.log(error) 
            dispatch(purchaseFailedHandler(error))
        })
    }

}
