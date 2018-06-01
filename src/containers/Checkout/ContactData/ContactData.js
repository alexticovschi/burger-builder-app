import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from "./ContactData.css";

import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        // the request is about to get sent so set loading to true
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
                //console.log(response)
                // once we get a response, set loading to false(stop loading)
                // setTimeout(() => {this.setState({ loading: false })}, 1500);
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                // stop loading event if we get an error
                this.setState({ loading: false });
                console.log(error);
            });
    }

    render () {
        let form = (
            <form>
                <Input inputtype="input" type="text" name="name" placeholder="Your Name"/>
                <Input inputtype="input" type="email" name="email" placeholder="Your Email"/>
                <Input inputtype="input" type="text" name="street" placeholder="Street"/>      
                <Input inputtype="input" type="text" name="postal" placeholder="Postal Code"/>                                                      
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;