import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/BuiltControls/BuiltControls'
import Modal from '../../components/Modal/Modal'
import OrderSummary from '../../components/ordersummary/ordersummary'
import axios from '../../Axios-instance'
import Spinner from '../../components/Spinner/Spinner'
class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing : false ,
        loading : false
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
        //  alert('this has been saved to cloud')
        const orders = {
            ingredients : {...this.state.ingredients} ,
            customerdetails : {
                phone : 3938246 ,
                address : {
                    street : "anarkali" , 
                    city : "delhi" ,
                    pin : "110051"
                },
                deliverymethod : "fastest"
            }
        }
        this.setState({loading : true})
        axios.post('/orders.json' , orders)
        .then(Response => {console.log(Response)
          this.setState({loading : false , purchasing : false})
        }) 
        .catch(error => {console.log(error) 
          this.setState({loading : false , purchasing : false})
        })
     }

     purchasingcancel = () => {

        this.setState({purchasing : false});
     }
   
     componentDidMount() {

        axios.get('https://burger-builder-178aa.firebaseio.com/ingredient.json')
        .then(response =>{
            console.log(response);
            
        })
        .catch(error => console.log(error))
     }
     
    render() {
        const disabledinfo = {...this.state.ingredients}
        let burger = <Spinner />
        let ordersummary = ( <OrderSummary ingredients = {this.state.ingredients}
            price = {this.state.totalPrice} 
            purchasingcancel = {this.purchasingcancel}
            purchasingcontinue = {this.purchasingcontinue}/>)

            if(this.state.loading)
            {
                ordersummary = <Spinner />
            }
            if(this.state.ingredients)
            {
                burger = (
                    <Aux>
                      <Burger ingredients={this.state.ingredients} />
                <BuildControls adding={this.addingredientshandler}
                    removing={this.removeingredienthanndler}
                    totalprice={this.state.totalPrice}
                    disabledinfo = {disabledinfo}
                    ispuchasable = {this.state.purchasable} 
                    purchasing ={this.purchasinghandle} />
                    </Aux>)
            }
        for(let i in disabledinfo)
        {
           disabledinfo[i] = disabledinfo[i] <= 0
        }
        return (
            <Aux>
                <Modal show = {this.state.purchasing} 
                      purchasingcancel = {this.purchasingcancel} >
                   {ordersummary}
                </Modal>
                    {burger}
            </Aux>
        )
    }
}

export default BurgerBuilder