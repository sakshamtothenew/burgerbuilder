import React , {Component} from 'react'
import Checkoutsummary from '../../components/CheckoutSummary/CheckoutSummary'
import ContactData from '../ContactData/ContactData'
import {Route , Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
class  Checkout extends Component {


    checkoutcontinuehandle = () => {
        this.props.history.replace('/checkout/contact-info')
    }

    checkoutcancelhandle = () => {

        this.props.history.goBack()
    }

   
  render () {
       let summary = <Redirect to ="/" />
       if(this.props.ingredients)
       {
           summary =  (<div>
            <Checkoutsummary ingredients  ={this.props.ingredients} 
              continuehandle = {this.checkoutcontinuehandle}
               cancelhandle = {this.checkoutcancelhandle}/>
               <Route path = {this.props.match.url + '/contact-info'}
                   render = {() => {
                     return ( <ContactData ingredients = {this.props.ingredients} 
                               price = {this.props.price}
                       />)
                   }}/>
       </div>
   
       )
       }
    
    
    return summary
  }

}

const mapStateToProps = state => {
    return {
        ingredients : state.burgerBuilder.ingredients , 
        price : state.burgerBuilder.TotalPrice
    }
};
export default connect(mapStateToProps)(Checkout)