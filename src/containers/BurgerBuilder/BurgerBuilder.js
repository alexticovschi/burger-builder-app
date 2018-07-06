import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';


class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount() {
        console.log(this.props);
        this.props.onInitIngredient();
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
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

    render () {
        // copy of ingredients object
        const disabledInfo = {...this.props.ings};

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0;
            console.log('disabledInfo[key] Button disabled!:',disabledInfo[key]);
        } 
        let orderSummary = null;
        let burger = this.props.error ? <p style={{textAlign:'center'}}>Ingredients can't be loaded!</p> : <Spinner/>

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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch( actions.addIngredient(ingName) ),
        onIngredientRemoved: (ingName) => dispatch( actions.removeIngredient(ingName) ),
        onInitIngredient: () => dispatch( actions.initIngredients() ),
        onInitPurchase: () => dispatch( actions.purchaseInit() )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));