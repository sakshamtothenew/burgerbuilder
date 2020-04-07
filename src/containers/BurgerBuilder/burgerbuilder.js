import React, { Component, useCallback, useState, useEffect } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/BuiltControls/BuiltControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/ordersummary/ordersummary'
import axios from '../../Axios-instance'
import Spinner from '../../components/UI/Spinner/Spinner'
import errorhandler from '../../hoc/errorhandler/errorhandling'
import { connect, useDispatch, useSelector } from 'react-redux'
import * as actionType from '../../store/actions/index'
const BurgerBuilder = (props) => {

    // state = {
    //     purchasing: false,
    //     loading: false,
    // }
    const [purchasing, changePurchase] = useState(false);
    //   const [loading  , changeLoading] = useState(false);
const dispatch = useDispatch()

    const ingredients = useSelector(state => { return state.burgerBuilder.ingredients });
    const TotalPrice = useSelector(state => state.burgerBuilder.TotalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);
    const redirectedpath = useSelector(state => state.auth.authredirectpath)

    const addingredientshandler = (ingname) => dispatch(actionType.addIngredient(ingname))
    const removeingredienthandler = (ingname) => dispatch(actionType.removeIngredient(ingname))
    const initIngredienthandler = useCallback(() => dispatch(actionType.initIngredients()) , [dispatch])
    const authredirectpath = (redirectpath) => dispatch(actionType.authredirectpath(redirectpath))

    const purchasehandler = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0
    }


    const purchasinghandle = () => {
        if (isAuthenticated) {
            console.log("authenitcated")
            changePurchase(true)
        }
        else {
            console.log("not authenticated")
            props.history.push('/Auth')
            authredirectpath('/checkout')
            console.log(redirectedpath)
        }
    }

    const purchasingcontinue = () => {
        //  alert('this has been saved to cloud')

        const ingr = { ...ingredients }
        let query = [];
        for (let i in ingr) {
            query.push(encodeURIComponent(i) + '=' + encodeURIComponent(ingr[i]))

        }
        query.push('price=' + props.totalPrice)
        let qstring = query.join('&');
        props.history.push({
            pathname: '/checkout',
            search: '?' + qstring
        })
    }

    const purchasingcancel = () => {
      changePurchase(false)
        // this.setState({ purchasing: false });

    }

    // componentDidMount() {
    useEffect(() => {
        initIngredienthandler()

    } , [initIngredienthandler])
    // console.log(this.props)
    // }


    const disabledinfo = { ...ingredients }
    console.log("this is ingredientss", ingredients)
    let burger = error ? <p>Something went wrong !!</p> : <Spinner left="50%" top="100px" />
    let ordersummary;

    if (ingredients) {
        burger = (
            <Aux>
                <Burger ingredients={ingredients} />
                <BuildControls adding={addingredientshandler}
                    removing={removeingredienthandler}
                    isAuth={isAuthenticated}
                    totalprice={TotalPrice}
                    disabledinfo={disabledinfo}
                    ispuchasable={purchasehandler(ingredients)}
                    purchasing={purchasinghandle} />
            </Aux>)

        ordersummary = (<OrderSummary ingredients={ingredients}
            price={TotalPrice}
            purchasingcancel={purchasingcancel}
            purchasingcontinue={purchasingcontinue} />)

    }

    // if (loading) {
    //     ordersummary = <Spinner />
    // }
    for (let i in disabledinfo) {
        disabledinfo[i] = disabledinfo[i] <= 0
    }
    return (
        <Aux>
            <Modal show={purchasing}
                purchasingcancel={purchasingcancel} >
                {ordersummary}
            </Modal>
            {burger}
        </Aux>
    )
}


export default errorhandler(BurgerBuilder, axios)