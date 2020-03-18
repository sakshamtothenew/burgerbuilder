import React from 'react'
import classes from './Logo.module.css'
import burgerimg from '../../assests/images/burger-logo.png'

const Logo  = (props) => {

    return  (
        <div className = {classes.Logo}>
            <img src ={burgerimg} alt = "burgerimg" />
        </div>
    )
}

export default Logo