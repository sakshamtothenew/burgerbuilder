import React from 'react'
import classes from './Spinner.module.css'


const Spinner = (props) => (
    <div className={classes["lds-ripple"]}
     style = {{left :  props.left ,  top : props.top  }}><div></div><div></div></div>
)

export default Spinner