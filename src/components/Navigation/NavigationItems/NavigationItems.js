import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( {isAuthenticated} ) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem> 
        {isAuthenticated 
            ? <NavigationItem link="/logout">Logout</NavigationItem> 
            : <NavigationItem link="/auth">Authenticate</NavigationItem> 
        }       
    </ul>
);

export default navigationItems;