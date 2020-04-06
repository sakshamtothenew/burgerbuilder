import * as actionTypes from './actionsTypes'
import axios from '../../Axios-instance'

export const addIngredient = (ingname) => {

    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: ingname
    }

}

export const removeIngredient = (ingname) => {

    return {

        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: ingname
    }
}

export const setingredientonfetch = (ingredients) => {

    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,

    }
}

export const setingredienterror = () => {

    return {
        type: actionTypes.SET_ERROR,

    }
}
export const initIngredients = () => {
    return dispatch => {
        axios.get('https://burger-builder-178aa.firebaseio.com/ingredients.json')
            .then(response => {
                console.log(response);
                // this.setState({ ingredients: response.data })
                dispatch(setingredientonfetch(response.data))
            })
            .catch(error => {
                console.log("this is the error occured", error);

                dispatch(setingredienterror())

            })
    }
}


