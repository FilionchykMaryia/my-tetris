import React from 'react';
import {StyledButton} from './styles/StyledButton';
import {LeftButton,
    RightButton,
    DownButton,
    UpButton
    } from './styles/StyledMobileNavigation';


const Button = ({ callback, text }) =>{ 
    if (text === 'LEFT') {
        return (
            <LeftButton onClick={callback} text={text}>&#706;</LeftButton> 
        )
    }else if (text === 'RIGHT') {
        return (
            <RightButton onClick={callback} text={text}>&#707;</RightButton> 
        )
    }else if (text === 'DOWN') {
        return (
            <DownButton onClick={callback} text={text}>&#709;</DownButton> 
        )
    }else if (text === 'UP') {
        return (
            <UpButton onClick={callback} text={text}>&#708;</UpButton> 
        )
    }else {
        return(
            <StyledButton onClick={callback}>{text}</StyledButton>
        )
    }
};

export default Button;