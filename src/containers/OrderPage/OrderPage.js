import React, { Component } from 'react';

import Order from './Order/Order';
import axios from '../../Axios-instance';
import errorhandler from '../../hoc/errorhandler/errorhandling';
import {connect} from 'react-redux' 
import  * as actions from '../../store/actions/index'

class Orders extends Component {
    
    componentDidMount() {
        console.log("this is userid =============================================================" , this.props.userId)
        this.props.onFetchOrders(this.props.token , this.props.userId);
    }

    render () {
        console.log(this.props.orders)
        return (
            <div>
                {this.props.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading , 
         token :  state.auth.token , 
         userId : state.auth.userid
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token , userId ) => dispatch( actions.fetchOrders(token , userId) )
    };
};
export default connect(mapStateToProps , mapDispatchToProps)(errorhandler(Orders, axios));