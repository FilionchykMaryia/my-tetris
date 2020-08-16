import React from 'react';
import Button from './Button';
import {StyledModalWindow, WindowContent} from './styles/StyledModalWindow';
import {CardTitle} from './../pages/styles/StyledAuthPage';


const ModalWindow = ({ gameOver, title, text, style, startGame }) => (
    
        <StyledModalWindow  gameOver={gameOver} style={style}>
       
               <WindowContent>
                   <CardTitle>{title}</CardTitle>
                   <p>{text}</p>
               </WindowContent>
               <Button callback={startGame} text={'New Game (R)'} />
          
         </StyledModalWindow>
    

     
);

export default ModalWindow;