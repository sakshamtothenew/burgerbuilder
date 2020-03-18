import React from 'react'
import classes from './SideDrawer.module.css'
import Aux from '../../../hoc/Aux'
import Backdrop from '../../Backdrop/Backdrop'
import NavigationItem from '../Navigationitems/Navigationitem/NavigationItem'
import Logo from '../../Logo/Logo'
const SideDrawer = (props) => {
    let attachclasses;
   if(props.show)
   {
        attachclasses = [classes.SideDrawer , classes.Open]
   }
   else {
        attachclasses = [classes.SideDrawer , classes.Close]
   }
    return (
        <Aux>
            <Backdrop  show = {props.show} click = {props.sidedrawerclosehandler} />
            <div className = {attachclasses.join(' ')}>
                <div className = {classes.Logo}>
                <Logo />
                </div>
              
               <NavigationItem >Burger Content</NavigationItem>
               <NavigationItem>Checkout</NavigationItem>
            </div>

        </Aux>
    )
}

export default SideDrawer