import React  from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from  'react-router-dom'
import * as serviceWorker from './serviceWorker';
import {connect , createStore , applyMiddleware ,  combineReducers , compose} from  'redux';
import burgerReducer  from './store/reducers/BurgerBuilder'
import orderReducer from './store/reducers/order'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'



const rootReducer = combineReducers({
  burgerBuilder: burgerReducer,
  order: orderReducer
});
  const Enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(rootReducer , Enhancers(
    applyMiddleware(thunk)
  ))
const app  =  (
  <Provider store = {store}>
    <BrowserRouter >
    <App />
  </BrowserRouter>
  </Provider>
  
)
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
