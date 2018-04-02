import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';


const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <Logo/>
        <div>MENU</div>
        <nav>
            ...
        </nav>
    </header>
);

export default toolbar;