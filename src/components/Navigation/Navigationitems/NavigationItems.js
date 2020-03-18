import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './Navigationitem/NavigationItem'

const NavigationItems = (props) => {

   return (
       <div className = {classes.NavigationItems}>
           <NavigationItem >Burger Content</NavigationItem>
           <NavigationItem >Checkout </NavigationItem>  
       </div>
   )
}


export default NavigationItems