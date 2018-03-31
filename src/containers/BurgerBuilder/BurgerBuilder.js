import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.6
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        // check the old count of the ingredient
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        // create a copy of ingredients object
        const updatedIngredients = {...this.state.ingredients};
        
        // Take the updatedIngredients object, access the type for which I have to
        //   update the ingredients and set the amount of the ingredients equal to updatedCount
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        // updade the state to have new ingredients and new price
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        console.log('updatedIngredients:',updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        // check the old count of the ingredient
        const oldCount = this.state.ingredients[type];

        if(oldCount === 0) return;
        const updatedCount = oldCount - 1;

        // create a copy of ingredients object
        const updatedIngredients = {...this.state.ingredients};
        
        // Take the updatedIngredients object, access the type for which I have to
        //   update the ingredients and set the amount of the ingredients equal to updatedCount
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceDeduction;

        // updade the state to have new ingredients and new price
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        console.log('updatedIngredients:',updatedIngredients)
    }

    render () {
        // copy of ingredients object
        const disabledInfo = {...this.state.ingredients};

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0;
            console.log('disabledInfo[key] Button disabled!:',disabledInfo[key]);
        }

        return (
            <Fragment>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                />
            </Fragment>
        )
    }
}

export default BurgerBuilder;