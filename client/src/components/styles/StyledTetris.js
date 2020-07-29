import styled from 'styled-components';
// BG Image
import bgImage from '../../img/background.png';

export const StyledTetrisWrapper = styled.div`
  max-width: 100vw;
  height: 100vh;
  background-image: linear-gradient(rgba(29,35,53, 0.6) 10%, rgba(17,23,41, 0.6) 80%), 
        url(${bgImage});
  background-size: cover;
  overflow: hidden;
  
`;

export const StyledTetris = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  padding: 40px;
  margin: 0 auto;
  max-width: 900px;
  min-width: 400px;

  aside {
    width: 85%;
    height: 20%;
    max-width: 200px;
    /* min-width: 50px;
    min-height: 100px; */
    margin: 0 auto;
    min-height: 15px;
    min-width: 30px;
    display: block;
    /* padding: 0 20px; */
  }
`;
