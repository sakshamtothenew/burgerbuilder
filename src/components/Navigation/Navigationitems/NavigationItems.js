import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './Navigationitem/NavigationItem'

const NavigationItems = (props) => {

   return (
       <div className = {classes.NavigationItems}>
           <NavigationItem link = '/' >Burger Content</NavigationItem>
           <NavigationItem link = '/Orderpage'  >OrderPage</NavigationItem>  
       </div>
   )
}


export default NavigationItems