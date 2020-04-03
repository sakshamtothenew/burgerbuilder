import * as actionType from '../actions/actionsTypes'
// import axios from '../../Axios-instance'
import { updateObj } from '../../shared/Utility'
const initialstate = {
    ingredients: null,
    TotalPrice: 4,
    error: false,
    building: false
}

const INITIAL_PRICE = {

    salad: 1,
    meat: 3,
    cheese: 2,
    bacon: 2
}
const reducer = (state = initialstate, action) => {

    switch (action.type) {
        case (actionType.ADD_INGREDIENTS):
            return updateObj(
                state,
                {
                    ingredients: {
                        ...state.ingredients,
                        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                    },
                    TotalPrice: state.TotalPrice + INITIAL_PRICE[action.ingredientName],
                    building: true

                })
        case (actionType.REMOVE_INGREDIENTS):
            return updateObj(
                state,
                {
                    ingredients: {
                        ...state.ingredients,
                        [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
                        error: null,
                        building: true
                    },
                    TotalPrice: state.TotalPrice - INITIAL_PRICE[action.ingredientName]



                })

        case (actionType.SET_INGREDIENTS):
            return updateObj(
                state,
                {
                    ingredients: action.ingredients,
                    error: false,
                    building: false,
                    TotalPrice: 4.00
                })

        case (actionType.SET_ERROR):
            return updateObj(
                state,
                {
                    error: true
                })

        default:
            return state
    }
}


export default reducer;