import React from 'react';

import classes from './Button.module.css';

const button = (props) => (
    <button disabled = {props.disabled}
            style = {props.disabled ? {color : "gray" , cursor : "no-drop" } : null}
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}>{props.children}</button>
);

export default button;