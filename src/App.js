import React from 'react';
import Aux from './hoc/Aux'
import Layout from './components/Layout/Layout'
import  {Route , Switch } from 'react-router-dom'
import './App.css';
import BurgerBuilder from './containers/BurgerBuilder/burgerbuilder';
import Checkout from './containers/Checkout/Checkout'
function App() {
  return (
    <Aux>
    <div>this is burger app</div>
   <Layout>
     <Switch>
     
      <Route path = '/checkout' component = {Checkout} />
      <Route path = '/' exact component ={BurgerBuilder} />
     
     </Switch>

     
     
   </Layout>

    </Aux>
   
  );
}

export default App;
