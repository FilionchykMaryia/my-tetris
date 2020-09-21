import React from 'react';
import {StyledButton} from './styles/StyledButton';

const PauseButton = ({ callback, text }) => (
    
<StyledButton onClick={callback}>{text}</StyledButton>
);
export default PauseButton;





