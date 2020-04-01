import React from 'react'
import Burger from '../Burger/Burger'
import Button from '../UI/Button/Button'
import classes from './CheckoutSummary.module.css'
const checkoutsummary = (props) => {
  
    return(
        <div className = {classes.CheckoutSummary}>
            <h1>we hope it taste well</h1>
            <div  style = {{width: '100%' , margin : 'auto'}}>
                <Burger ingredients = {props.ingredients}/>
            </div>
            <Button clicked = {props.cancelhandle} btnType = "Danger">Cancel</Button>
            <Button clicked = {props.continuehandle} btnType = "Success">Continue</Button>
        </div>
    )
     
}


export default checkoutsummary