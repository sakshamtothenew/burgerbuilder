import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/BuiltControls/BuiltControls'
import Modal from '../../components/Modal/Modal'
import OrderSummary from '../../components/ordersummary/ordersummary'
class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            meat: 0,
            bacon: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing : false
    }

    price = {
        salad: 1,
        meat: 3,
        cheese: 2,
        bacon: 2
    }

    purchasehandler = (ingredients) => {
        const sum = Object.keys( ingredients )
        .map( igKey => {
            return ingredients[igKey];
        } )
        .reduce( ( sum, el ) => {
            return sum + el;
        }, 0 );
    this.setState( { purchasable: sum > 0 } );
    }
    addingredientshandler = (type) => {
        let ingr = { ...this.state.ingredients };
        let totalprice = this.state.totalPrice;
        ingr[type] += 1;
        totalprice += this.price[type];
     
        this.setState({
            ingredients: ingr,
            totalPrice: totalprice
        })
        this.purchasehandler(ingr)
    }

    removeingredienthanndler = (type) => {

        let ingr = { ...this.state.ingredients };
        if(ingr[type]<=0)
          return;
        let totalprice = this.state.totalPrice;
        ingr[type] -= 1;
        totalprice -= this.price[type];

        this.setState({
            ingredients: ingr,
            totalPrice: totalprice
        })
        this.purchasehandler(ingr)
    }

     purchasinghandle = () => {
         this.setState({purchasing : true})
     }

     purchasingcontinue = () => {
         alert('this has been saved to cloud')
     }

     purchasingcancel = () => {

        this.setState({purchasing : false});
     }
    render() {
        const disabledinfo = {...this.state.ingredients}
        for(let i in disabledinfo)
        {
           disabledinfo[i] = disabledinfo[i] <= 0
        }
        return (
            <Aux>
                <Modal show = {this.state.purchasing} 
                      purchasingcancel = {this.purchasingcancel} >
                    <OrderSummary ingredients = {this.state.ingredients}
                                    price = {this.state.totalPrice} 
                                    purchasingcancel = {this.purchasingcancel}
                                    purchasingcontinue = {this.purchasingcontinue}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls adding={this.addingredientshandler}
                    removing={this.removeingredienthanndler}
                    totalprice={this.state.totalPrice}
                    disabledinfo = {disabledinfo}
                    ispuchasable = {this.state.purchasable} 
                    purchasing ={this.purchasinghandle} />
            </Aux>
        )
    }
}

export default BurgerBuilder