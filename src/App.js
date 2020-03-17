import React from 'react';
import Aux from './hoc/Aux'
import Layout from './components/Layout/Layout'
import './App.css';
import BurgerBuilder from './containers/BurgerBuilder/burgerbuilder';

function App() {
  return (
    <Aux>
    <div>this is burger app</div>
   <Layout>
     <BurgerBuilder />
   </Layout>

    </Aux>
   
  );
}

export default App;
