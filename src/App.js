import React, { Component } from 'react';
import Aux from './hoc/Aux'
import Layout from './hoc/Layout/Layout'
import  {Route , Switch , Redirect} from 'react-router-dom'
import './App.css';
import BurgerBuilder from './containers/BurgerBuilder/burgerbuilder';
import Checkout from './containers/Checkout/Checkout'
import OrderPage from './containers/OrderPage/OrderPage'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux'
import * as action  from './store/actions/index'
class  App extends Component {

 componentDidMount() {
    this.props.checkauthstatus();
 }

  render() {
    let routes = (
      <Switch>
        <Route path="/Auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={OrderPage} />
          <Route path="/logout" component={Logout} />
          <Route path = "/Auth" component = {Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <Aux>
      <div>this is burger app</div>
     <Layout>
     {routes}
     </Layout>
  
      </Aux>
     
    );
  }
  
}

const mapStateToProps = state =>  {
  return {
    isAuthenticated :   state.auth.token !== null
  }
}
 const mapDispatchToProps = dispatch => {

  return {

     checkauthstatus : () =>  dispatch(action.authCheckState())
  }
 }
export default connect(mapStateToProps, mapDispatchToProps)(App);
