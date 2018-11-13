import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    // convert an object of key-value pairs into array of ingredients
    const arrOfIng = Object.keys(props.ingredients);
    // console.log('Array of ingredients:', arrOfIng);

    let ingredients = arrOfIng.map(ingKey => {
        return [...Array(props.ingredients[ingKey])].map((_, i) => {
            return <BurgerIngredient key={ingKey + i} type={ingKey} />
        });
    }).reduce((arr, el) => arr.concat(el), []);

    // console.log(ingredients);
    if(ingredients.length === 0) {
        ingredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
                {ingredients}                      
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default burger;