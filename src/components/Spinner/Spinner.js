import React from 'react'
import classes from './Spinner.module.css'


const Spinner = (props) => (
    <div className={classes["lds-ripple"]}><div></div><div></div></div>
)

export default Spinner