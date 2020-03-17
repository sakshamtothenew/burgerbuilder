import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/BuiltControls/BuiltControls'
class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            meat: 0,
            bacon: 0
        },
        totalPrice: 4,
        purchasable: false
    }

    price = {
        salad: 1,
        meat: 3,
        cheese: 2,
        bacon: 2
    }

    purchasehandler = () => {
        if (this.state.totalPrice > 4) {
            this.setState({ purchasable: true })
        }
        else {
            this.setState({ purchasable: false })
        }
    }
    addingredientshandler = (type) => {
        let ingr = { ...this.state.ingredients };
        let totalprice = this.state.totalPrice;
        ingr[type] += 1;
        totalprice += this.price[type];
        this.purchasehandler()
        this.setState({
            ingredients: ingr,
            totalPrice: totalprice
        })
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
        this.purchasehandler()
    }
    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls adding={this.addingredientshandler}
                    removing={this.removeingredienthanndler}
                    totalprice={this.state.totalPrice} />
            </Aux>
        )
    }
}

export default BurgerBuilder