import styled from 'styled-components';
import device from './device';


export const StyledButton = styled.button`
  box-sizing: border-box;
  margin: 0 0 5px 0;
  padding: 15px;
  min-height: 15px;
  min-width: 30px;
  width: auto;
  border: none;
  color: white;
  background: rgba(30, 58, 142, 0.8);
  box-shadow: 0px 0px 28px 0px rgba(0,5,23,0.6);
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 1rem;
  outline: none;
  cursor: pointer;


  @media ${device.mobileS} {
    min-height: 15px;
    height: 30px;
    padding: 4px;
    font-size: 0.4rem;
  };
  @media ${device.tablet} {
    width: auto; 
    min-height: 45px;
    margin: 0 0 5px 0;
    padding: 15px;
    font-size: 1rem;
  };

`;


// export const grid = (props) => {
// console.log(props);
//   if (props.text === 'LEFT'){
//     return `grid-row: 2/3; grid-column: 1/2;`
//   }
//   if (props.text === 'RIGHT'){
//     return `grid-row: 2/3; grid-column: 3/4;`
//   }
//   if (props.text === 'DOWN'){
//     return `grid-row: 3/4; grid-column: 2/3;`
//   }
//   if (props.text === 'UP'){
//     return `grid-row: 1/2; grid-column: 2/3;`
//   }
  
// }