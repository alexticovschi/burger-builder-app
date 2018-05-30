import React from 'react';
import classes from './Order.css';

const order = (props) => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName, 
            amount: props.ingredients[ingredientName]
        });
    }

    const ingredientOutput = ingredients.map((ing, key) => {
        return (
            <span 
                key={ing.name}
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '4px 6px',
                    border: '1px solid #ccc',
                    padding: '3px 8px'
                    }}>
                    {ing.name} ({ing.amount}) 
            </span>
        );
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default order;