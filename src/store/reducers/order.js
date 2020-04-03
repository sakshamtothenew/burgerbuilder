import * as actionTypes from '../actions/actionsTypes'
import { updateObj } from '../../shared/Utility'


const initialData = {

    orders: [],
    loading: false,
    puchased: false
}


const reducers = (state = initialData, actions) => {
    const newOrder = {
        ...actions.orderData,

        id: actions.orderid
    }
    switch (actions.type) {

        case (actionTypes.PURCHASE_INIT):
            return updateObj(state, { purchased: false })
        case (actionTypes.PURCHASE_SUCCESS):
            return updateObj(
                state,
                {
                    loading: false,
                    orders: state.orders.concat(newOrder),
                    purchased: true
                })

        case (actionTypes.PURCHASE_FAIL):
            return updateObj(
                state,
                { loading: false })

        case (actionTypes.PURCHASE_START):
            return updateObj(
                state,
                {
                    loading: true,

                })
        case (actionTypes.FETCH_ORDERS_START):
            return updateObj(
                state,
                {
                    loading: true,

                })
        case (actionTypes.FETCH_ORDERS_SUCCESS):
            return updateObj(
                state,
                {
                    orders: actions.orders,
                    loading: false
                })
        case (actionTypes.FETCH_ORDERS_FAIL):
            return updateObj(
                state,
                {
                    loading: false
                })
        default:
            return state
    }
}

export default reducers