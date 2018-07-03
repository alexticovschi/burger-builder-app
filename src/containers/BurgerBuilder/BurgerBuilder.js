import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as burgerBuilderActions from '../../store/actions/index';


class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount() {
        console.log(this.props);
        
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        // go to /checkout
        this.props.history.push('/checkout');
    }

    updatePurchaseState = (ingredients) => {
        // convert ingredients obj into array, map over it and return the sum of ingredients
        const sum = Object.keys(ingredients)
                          .map(ingKey => ingredients[ingKey])
                          .reduce((sum,el) => (sum + el));
        // update the purchasable state to true or false
        return  sum > 0;
    }

    // addIngredientHandler = (type) => {
    //     // check the old count of the ingredient
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;

    //     // create a copy of ingredients object
    //     const updatedIngredients = {...this.state.ingredients};
        
    //     // Take the updatedIngredients object, access the type for which I have to
    //     //   update the ingredients and set the amount of the ingredients equal to updatedCount
    //     updatedIngredients[type] = updatedCount;

    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;

    //     // updade the state to have new ingredients and new price
    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     })
    //     this.updatePurchaseState(updatedIngredients);
    //     console.log('updatedIngredients:',updatedIngredients)
    // }

    // removeIngredientHandler = (type) => {
    //     // check the old count of the ingredient
    //     const oldCount = this.state.ingredients[type];

    //     if(oldCount === 0) return;
    //     const updatedCount = oldCount - 1;

    //     // create a copy of ingredients object
    //     const updatedIngredients = {...this.state.ingredients};
        
    //     // Take the updatedIngredients object, access the type for which I have to
    //     //   update the ingredients and set the amount of the ingredients equal to updatedCount
    //     updatedIngredients[type] = updatedCount;

    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;

    //     // updade the state to have new ingredients and new price
    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     })
    //     this.updatePurchaseState(updatedIngredients);
    //     console.log('updatedIngredients:',updatedIngredients)
    // }

    render () {
        // copy of ingredients object
        const disabledInfo = {...this.props.ings};

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0;
            console.log('disabledInfo[key] Button disabled!:',disabledInfo[key]);
        } 
        let orderSummary = null;
        let burger = this.state.error ? <p style={{textAlign:'center'}}>Ingredients can't be loaded!</p> : <Spinner/>

        if(this.props.ings) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price}
                    />
                </Fragment>
            );
            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}/>;
        
        }
        // if(this.state.loading) {
        //     orderSummary = <Spinner />
        // }
        
        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch( burgerBuilderActions.addIngredient(ingName) ),
        onIngredientRemoved: (ingName) => dispatch( burgerBuilderActions.removeIngredient(ingName) )   
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));