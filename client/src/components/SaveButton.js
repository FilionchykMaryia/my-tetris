import React from 'react';
// import styled from 'styled-components';
import {StyledButton} from './styles/StyledButton';

// const StyledButton = styled.button`
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

const SaveButton = ({ callback }) => (
  <StyledButton onClick={callback}>Save score (S)</StyledButton>
);

export default SaveButton;