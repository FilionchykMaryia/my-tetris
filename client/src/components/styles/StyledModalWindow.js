import styled from 'styled-components';

export const StyledModalWindow = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  min-height: 15px;
  min-width: 30px;
  width: 100%;
  height: 100%;
  color: ${props => (props.gameOver ? 'red' : 'white')};
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 1rem;
  flex: 0 0 auto;
  background: rgba(0,5,23,0.6);
  box-shadow: 0px 0px 28px 0px rgba(0,5,23,0.6);
  z-index: 12;
    
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
  
`;