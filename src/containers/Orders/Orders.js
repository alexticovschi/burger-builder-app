import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                // console.log(response.data);
                const fetchedOrders = [];
                for(let key in response.data) {
                    // push an array of order objects, with their coresponding id, in fetchOrders array
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    }); 
                    // console.log('[fetchedOrders]: ', fetchedOrders);
                }
                this.setState({loading: false, orders: fetchedOrders});
            })
            .catch(error => {
                this.setState({loading: false});
            })
    }
    render() {
        return (
            <div>
                <Order />
                <Order />
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);