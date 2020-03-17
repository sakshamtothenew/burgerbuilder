import React from 'react'
 import classes from './BuiltControl.module.css'

const builtcontrol = (props) => {

    return(
        <div className = {classes.BuildControl}>
            <div className = {classes.Label}> {props.label}</div> 
            <button onClick = {props.remclick} disabled = {props.disability} className = {classes.Less}>Less</button>
            <button onClick = {props.addclick} className = {classes.More}>More</button>
        </div>
    )
}

export default builtcontrol;