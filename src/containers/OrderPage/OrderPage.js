import React , {Component} from 'react'
import Order from './Order/Order'
import classes from './OrderPage.module.css'
class OrderPage extends Component {

    render() {

        return(
            <div className = {classes.OrderPage}>
                <Order />
                <Order />
                
            </div>
        )
    }
}

export default OrderPage