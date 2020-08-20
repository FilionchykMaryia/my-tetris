import styled from 'styled-components';

export const StyledTetrisWrapper = styled.div`
  max-width: 100vw;
  height: 100vh;
 
`;

export const StyledTetris = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  padding: 40px;
  margin: 0 auto;
  max-width: 900px;
  min-width: 400px;
  width: 75%;

  aside {
    width: 35%;
    height: 10%;
    max-width: 200px;
    /* min-width: 50px;
    min-height: 100px; */
    margin: 0 auto;
    min-height: 15px;
    min-width: 50px;
    display: block;
    display: flex;
    flex-direction: column;
    flex: 0 1 auto;
    /* padding: 0 20px; */
  }
`;
