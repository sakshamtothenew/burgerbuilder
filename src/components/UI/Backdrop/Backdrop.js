import React from 'react'
import classes from './Backdrop.module.css'
const backdrop = (props) => {
    return(
        <div onClick ={props.click} className = {classes.Backdrop}
        style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0'
        }}>></div>
    )
}

export default backdrop