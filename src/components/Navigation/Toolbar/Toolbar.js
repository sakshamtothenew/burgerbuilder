import React from 'react'
import Aux from '../../../hoc/Aux'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../Navigationitems/NavigationItems'
import Drawertoggle from '../Sidedrawer/Drawertoggle/Drawertoggle'

const Toolbar = (props) => {
    return (
       <Aux>
            <header className = {classes.Toolbar} >
               <Drawertoggle click = {props.togglesidehandle} />
            <Logo />
         <NavigationItems  isAuthenticated = {props.isAuth} />
            </header>
           
       </Aux>
    )
}

export default Toolbar