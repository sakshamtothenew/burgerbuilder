import React , {Component} from 'react'
import Checkoutsummary from '../../components/CheckoutSummary/CheckoutSummary'
import ContactData from '../ContactData/ContactData'
import {Route} from 'react-router-dom'
class  Checkout extends Component {

    state = {
        ingredients : {
            salad : 1 ,
             cheese : 1 , 
             bacon : 1,
             meat :1
        } , 
        totalPrice : 0
    }
    checkoutcontinuehandle = () => {
        this.props.history.replace('/checkout/contact-info')
    }

    checkoutcancelhandle = () => {

        this.props.history.goBack()
    }

    componentDidMount() {

        const querydata = new URLSearchParams(this.props.location.search);

        const ingredients = {};
        let price = 0;
        for(let params of querydata.entries())
        {    
            if(params[0] === 'price')
            {
                price = params[1]
            }
            ingredients[params[0]] = +params[1]
        }
        console.log(ingredients);
        this.setState({
            ingredients : ingredients , 
            totalPrice : price
        })

        console.log(this.state.ingredients)
    }
  render () {
     
    console.log(this.state.ingredients)
    
    return (<div>
         <Checkoutsummary ingredients  ={this.state.ingredients} 
           continuehandle = {this.checkoutcontinuehandle}
            cancelhandle = {this.checkoutcancelhandle}/>
            <Route path = {this.props.match.url + '/contact-info'}
                render = {() => {
                  return ( <ContactData ingredients = {this.state.ingredients} 
                            price = {this.state.totalPrice}
                    />)
                }}/>
    </div>

    )
  }

}

export default Checkout 