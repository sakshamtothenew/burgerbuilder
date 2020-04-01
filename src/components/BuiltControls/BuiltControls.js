import React from 'react'
import BuildControl from './BuiltControl/BuildControl'
import classes from './BuiltControls.module.css'
const controls = [
    { label: "Cheese", type: "cheese" },
    { label: "meat", type: "meat" },
    { label: "bacon", type: "bacon" },
    { label: "salad", type: "salad" },

]
const BuildControls = (props) => {
   console.log("[BuildControls ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: " , props.isAuth)
    return (
        <div className={classes.BuildControls}>
            <div className={classes.price}>Total Price : {props.totalprice}</div>
            {
                controls.map((i) => {
                    return <BuildControl label={i.label}
                        key={i.type}
                        addclick={() => props.adding(i.type)}
                        remclick={() => props.removing(i.type)}
                        disability = {props.disabledinfo[[i.type]]} />
                })
            }
            <button disabled ={!props.ispuchasable} 
            onClick = {props.purchasing}
            className={classes.OrderButton}>{props.isAuth ? 'Order now' : 'SignUp To Order'} </button>
        </div>
    )
}

export default BuildControls;