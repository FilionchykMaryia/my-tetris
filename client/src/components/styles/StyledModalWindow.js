import styled from 'styled-components';
import device from './device';

export const StyledModalWindow = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin: 0;
  min-height: 15px;
  min-width: 30px;
  width: 88%;
  height: 70vh;
  color: ${props => (props.gameOver ? 'red' : 'white')};
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 1rem;
  flex: 0 0 auto;
  background: rgba(0,5,23,0.6);
  /* box-shadow: 0px 0px 28px 0px rgba(0,5,23,0.6); */
  z-index: 12;
  @media ${device.mobileL} {
    width: 90%;
    height: 70vh;
  }; 
  @media ${device.tablet} {
    width: 95%;
    height: 100vh;
  }; 
  @media ${device.laptop} {
    width: 100%;
  };  

`;

export const WindowContent = styled.div`
box-sizing: border-box;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: 1rem;
width: 70%;
min-height: 15px;
min-width: 30px;
font-size: 1.5rem;
flex: 0 0 auto;
@media ${device.mobileS} {
  margin-top: 0.5rem;
   
};
`;