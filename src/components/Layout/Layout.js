import React from 'react'
import Aux from '../../hoc/Aux'
import BurgerBuilder from '../../containers/BurgerBuilder/burgerbuilder'


const Layout = (props) => {

    return (
        <Aux>
            <div>toolbox sidemenu ddrop down</div>
        

           <main>{props.children}</main>
        </Aux>
    )
} 

export default Layout