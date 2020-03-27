import * as actionType from '../actions/actionsTypes'
import axios from '../../Axios-instance'
const initialstate = {
    ingredients: null , 
    TotalPrice: 4, 
    error : false 
}

const INITIAL_PRICE = {

    salad: 1,
    meat: 3,
    cheese: 2,
    bacon: 2
}
const reducer = (state = initialstate, action) => {
    console.log(action.ingredientName)
    console.log(action.type);
    switch (action.type) {
        case (actionType.ADD_INGREDIENTS):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                TotalPrice: state.TotalPrice + INITIAL_PRICE[action.ingredientName]


            }
        case (actionType.REMOVE_INGREDIENTS):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        error: null
    },
                TotalPrice: state.TotalPrice - INITIAL_PRICE[action.ingredientName]



            }

            case (actionType.SET_INGREDIENTS) : 
              return {
                   ...state , 
                    ingredients : action.ingredients  , 
                    error : false 
              }

              case (actionType.SET_ERROR) : 
              return {
                   ...state ,
                   error : true
              }

        default:
            return state
    }
}


export default reducer;