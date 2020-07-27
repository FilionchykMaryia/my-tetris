import styled from 'styled-components';

export const StyledDisplay = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 20px 0;
  padding: 20px;
  /* border: 3px solid #333; */
  border: 3px solid rgba(3,20,60);
  border-image: linear-gradient(to right, rgba(3, 20, 60, 0.8) 0%, rgba(30, 58, 142, 0.8) 100%);
  border-image-slice: 1;  
  min-height: 30px;
  width: 100%;
  /* border-radius: 10px; */
  color: ${props => (props.gameOver ? 'red' : '#999')};
  background: #000;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
`;
