import React from 'react';
import {NavLink} from 'react-router-dom';
import Button from './Button';
import {StyledModalWindow, WindowContent} from './styles/StyledModalWindow';
import {CardTitle} from './styles/StyledPage';


const ModalWindow = ({ gameOver, title, text, style, startGame }) => (
   
       <StyledModalWindow  gameOver={gameOver} style={style}>
            
            <WindowContent>
                <CardTitle>{title}</CardTitle>
                <p>{text}</p>
            </WindowContent>
            
            <Button callback={startGame} text={'Close'} />
            <NavLink to="/details">View Details</NavLink>

        
        </StyledModalWindow>
       
);

export default ModalWindow;