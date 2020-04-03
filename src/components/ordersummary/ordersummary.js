import React from 'react'
import Aux from '../../hoc/Aux';
import Button from '../UI/Button/Button'
const ordersummary = (props) => {

    const ingr = props.ingredients;

    let ingrarray = Object.keys(ingr).map((igkey) => {
        return <li key={igkey}>
            {igkey} : {props.ingredients[igkey]}</li>
    })
    return (
        <Aux>
            <div>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingrarray}
                </ul>
                <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={props.purchasingcancel}>CANCEL</Button>
                <Button btnType="Success" clicked={props.purchasingcontinue}>CONTINUE</Button>
            </div>

        </Aux>

    )
}


export default ordersummary