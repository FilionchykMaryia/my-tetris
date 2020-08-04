import styled from 'styled-components';

export const StyledDisplay = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  margin: 0 0 5px 0;
  padding: 1rem;
  /* border: 3px solid #333; */
  /* border: 3px solid rgba(3,20,60);
  border-image: linear-gradient(to right, rgba(3, 20, 60, 0.8) 0%, rgba(30, 58, 142, 0.8) 100%); */
  /* border-image-slice: 1;   */
  min-height: 15px;
  min-width: 30px;
  width: 100%;
  /* border-radius: 10px; */
  color: ${props => (props.gameOver ? 'red' : '#999')};
  background: rgba(0,5,23,0.9);
  box-shadow: 0px 0px 28px 0px rgba(0,5,23,0.6);
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 0.7rem;
  flex: 0 0 auto;
`;
