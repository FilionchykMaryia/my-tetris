import React from 'react';
import {StyledButton} from './styles/StyledButton';
//import styled from 'styled-components';

// const StyledPauseButton = styled.button`
//   box-sizing: border-box;

//   margin: 0 0 20px 0;
//   padding: 20px;
//   min-height: 30px;
//   width: 100%;
//   border-radius: 20px;
//   border: none;
//   color: white;
//   background: #333;
//   font-family: Pixel, Arial, Helvetica, sans-serif;
//   font-size: 1rem;
//   outline: none;
//   cursor: pointer;
// `;

const PauseButton = ({ callback, text }) => (
<StyledButton onClick={callback}>{text}</StyledButton>
);
export default PauseButton;





