import styled from 'styled-components';
import device from './device';

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
  /* max-width: 900px;
  min-width: 400px; */
  width: 75%;
  max-width: 100vw;


  aside {
    width: 35%;
    height: 10%;
    max-width: 200px;
    min-height: 100px; 
    margin: 0 auto;
    min-width: 50px;
    display: block;
    display: flex;
    flex-direction: column;
    flex: 0 1 auto;
    /* padding: 0 20px; */
  }

  @media ${device.mobileS} {
    justify-content: space-between;
    padding: 10px;
    margin: 10px;
    width: 100%;
    height: 50%;
    aside {
      width: 30%;
      margin: 0 25px 25px 0;
    }
  };
   @media ${device.tablet} {
    flex-direction: row;
    aside {
      width: 30%;
      margin: 0 25px 25px 0;
    }
  };
  @media ${device.laptop} {
    margin: 0 auto;
    justify-content: space-around;
    width: 60%;
    aside {
      width: 40%;
      margin: 0 auto;
   
    }
  };
  @media ${device.laptopL} {
    padding: 40px;

  };

`;
