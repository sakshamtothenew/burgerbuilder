import React, { Component } from 'react'
import Burgeringredient from './BurgerIngredients/burgeringredients'
import Aux from '../../hoc/Aux'
import classes from './burger.module.css'

class Burger extends Component {

  render() {
    const ingredients = this.props.ingredients;

    let ingarray = Object.keys(ingredients).map((igkey) => {
      return [...Array(this.props.ingredients[igkey])].map((_, i) => {
        return <Burgeringredient key={igkey + i} type={igkey} />
      })
    });
    console.log(ingarray);
    return (
      <div className={classes.burger}>
        <Burgeringredient type="bread-top" />

        {ingarray}


        <Burgeringredient type="bread-bottom" />
      </div>

    )
  }


}


export default Burger
