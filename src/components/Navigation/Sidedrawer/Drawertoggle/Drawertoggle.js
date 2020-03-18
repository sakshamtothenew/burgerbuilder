import React from 'react'
import classes from "./Drawertoggle.module.css"

const Drawertoggle = (props) => {

    return (
        <div onClick={props.click} className={classes.DrawerToggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Drawertoggle;