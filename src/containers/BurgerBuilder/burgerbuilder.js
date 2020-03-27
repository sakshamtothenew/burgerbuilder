import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/BuiltControls/BuiltControls'
import Modal from '../../components/Modal/Modal'
import OrderSummary from '../../components/ordersummary/ordersummary'
import axios from '../../Axios-instance'
import Spinner from '../../components/Spinner/Spinner'
import errorhandler from '../../hoc/errorhandler/errorhandling'
import {connect}  from 'react-redux' 
import * as actionType from '../../store/actions/BurgerBuilder'
class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
    }


    purchasehandler = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0
    }
    // addingredientshandler = (type) => {
    //     let ingr = { ...this.state.ingredients };
    //     let totalprice = this.state.totalPrice;
    //     ingr[type] += 1;
    //     totalprice += this.price[type];

    //     this.setState({
    //         ingredients: ingr,
    //         totalPrice: totalprice
    //     })
    //     this.purchasehandler(ingr)
    // }

    // removeingredienthanndler = (type) => {

    //     let ingr = { ...this.state.ingredients };
    //     if(ingr[type]<=0)
    //       return;
    //     let totalprice = this.state.totalPrice;
    //     ingr[type] -= 1;
    //     totalprice -= this.price[type];

    //     this.setState({
    //         ingredients: ingr,
    //         totalPrice: totalprice
    //     })
    //     this.purchasehandler(ingr)
    // }

    purchasinghandle = () => {
        this.setState({ purchasing: true })
    }

    purchasingcontinue = () => {
        //  alert('this has been saved to cloud')

        const ingr = { ...this.props.ingredients }
        let query = [];
        for (let i in ingr) {
            query.push(encodeURIComponent(i) + '=' + encodeURIComponent(ingr[i]))

        }
        query.push('price=' + this.props.totalPrice)
        let qstring = query.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + qstring
        })
    }

    purchasingcancel = () => {

        this.setState({ purchasing: false });
    }

    componentDidMount() {
        console.log(this.props)
       this.props.initIngredienthandler()
    }

    render() {
        const disabledinfo = { ...this.props.ingredients }
           console.log("this is ingredientss" , this.props.ingredient)
        let burger = this.props.error ? <p>Something went wrong !!</p> : <Spinner />
        let ordersummary;

        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls adding={this.props.addingredientshandler}
                        removing={this.props.removeingredienthandler}
                        totalprice={this.props.totalPrice}
                        disabledinfo={disabledinfo}
                        ispuchasable={this.purchasehandler(this.props.ingredients)}
                        purchasing={this.purchasinghandle} />
                </Aux>)

            ordersummary = (<OrderSummary ingredients={this.props.ingredients}
                price={this.props.TotalPrice}
                purchasingcancel={this.purchasingcancel}
                purchasingcontinue={this.purchasingcontinue} />)

        }

        if (this.state.loading) {
            ordersummary = <Spinner />
        }
        for (let i in disabledinfo) {
            disabledinfo[i] = disabledinfo[i] <= 0
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing}
                    purchasingcancel={this.purchasingcancel} >
                    {ordersummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}
const mapStateToProps = state => {

    return {

        ingredients : state.burgerBuilder.ingredients,
        TotalPrice : state.burgerBuilder.TotalPrice,
        error : state.error
    }

}

const mapDispatchToProps = dispatch => {
    return {
        addingredientshandler: (ingname) => dispatch(actionType.addIngredient(ingname)),
        removeingredienthandler: (ingname) => dispatch(actionType.removeIngredient(ingname)),
        initIngredienthandler : () => dispatch(actionType.initIngredients()) 
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(errorhandler(BurgerBuilder, axios))