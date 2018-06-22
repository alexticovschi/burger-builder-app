import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {
    state = {
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    }

    componentDidMount() {
        // console.log(this.props);
        // axios.get('https://react-burger-builder-d41a0.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data})
        //     })
        //     .catch(error => {
        //         this.setState({ error: true })
        //     })
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        // alert('You continue!');

        // go to /checkout
        const queryParams = [];
        for(let i in this.state.ingredients) {
            // queryParams: array that contains couple of strings which is property name equal property value
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    updatePurchaseState = (ingredients) => {
        // convert ingredients obj into array, map over it and return the sum of ingredients
        const sum = Object.keys(ingredients)
                          .map(ingKey => ingredients[ingKey])
                          .reduce((sum,el) => (sum + el));
        // update the purchasable state to true or false
        this.setState({ purchasable: sum > 0 });
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
                        purchasable={this.state.purchasable}
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
        if(this.state.loading) {
            orderSummary = <Spinner />
        }
        
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
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})   
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));