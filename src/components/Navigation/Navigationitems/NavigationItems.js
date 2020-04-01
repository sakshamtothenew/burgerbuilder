import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './Navigationitem/NavigationItem'

const NavigationItems = (props) => {

   return (
       <div className = {classes.NavigationItems}>
           <NavigationItem link = '/' >Burger Content</NavigationItem>
         { props.isAuthenticated ?  <NavigationItem link = '/orders'  >OrderPage</NavigationItem> : null }
        {props.isAuthenticated ?
         <NavigationItem link = '/logout' >Logout</NavigationItem> 
        : <NavigationItem link = '/auth'>Authenticate</NavigationItem>}
       </div>
   )
}


export default NavigationItems