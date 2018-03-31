import React from 'react';

import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.css';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }    
];



const buildControls = (props) => (
    <div className={classes.BuildControls}>
        { controls.map(el => (
            <BuildControl 
                key={el.label} 
                label={el.label} 
                added={() => props.ingredientAdded(el.type)}
            />
        ))}
    </div>
);


export default buildControls;
