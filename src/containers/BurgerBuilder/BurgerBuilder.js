import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

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
        totalPrice: 0,
        purchasable: false,
        purchasing: false
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        //alert('You continue!');
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Sherlock Holmes',
                address: {
                    street: '221B Baker Street',
                    postalCode: 'NW1 6XE',
                    country: 'England'
                },
                email: 'sholmes@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response)
            })
            .catch(error => console.log(error));
    }

    updatePurchaseState = (ingredients) => {
        // convert ingredients obj into array, map over it and return the sum of ingredients
        const sum = Object.keys(ingredients)
                          .map(ingKey => ingredients[ingKey])
                          .reduce((sum,el) => (sum + el));
        // update the purchasable state to true or false
        this.setState({ purchasable: sum > 0 });
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
        this.updatePurchaseState(updatedIngredients);
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
        const newPrice = oldPrice - priceDeduction;

        // updade the state to have new ingredients and new price
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);
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
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}
                />
            </Fragment>
        )
    }
}

export default BurgerBuilder;