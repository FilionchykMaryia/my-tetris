import styled from 'styled-components';
import device from './device';


export const StyledMobileNavigation = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 1px;
  margin-top: 0.5rem;
 
  @media ${device.laptop} {
    display: none;
  };

  
`;

    export const LeftButton = styled.button`
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
    grid-row: 2 / 3;
    grid-column: 1 / 2;
  
    @media ${device.mobileS} {
      min-height: 20px;
      padding: 4px;
      font-size: 0.4rem;
    };
    @media ${device.tablet} {
      width: auto;
      min-height: 45px;
      margin: 0 0 5px 0;
      padding: 15px;
      font-size: 1rem;
    }

    
  `;
      export const RightButton = styled.button`
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
      grid-row: 2 / 3;
      grid-column: 3 / 4;
    
      @media ${device.mobileS} {
        min-height: 20px;
        padding: 4px;
        font-size: 0.4rem;
      };
      @media ${device.tablet} {
        width: auto;
        min-height: 45px;
        margin: 0 0 5px 0;
        padding: 15px;
        font-size: 1rem;
      }

    `;
      export const DownButton = styled.button`
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
      grid-row: 3 / 4;
      grid-column: 2 / 3;

      @media ${device.mobileS} {
        min-height: 20px;
        padding: 4px;
        font-size: 0.4rem;
      };
      @media ${device.tablet} {
        width: auto;
        min-height: 45px;
        margin: 0 0 5px 0;
        padding: 15px;
        font-size: 1rem;
      }

    `;
      export const UpButton = styled.button`
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
      grid-row: 1 / 2;
      grid-column: 2 / 3;

      @media ${device.mobileS} {
        min-height: 20px;
        padding: 4px;
        font-size: 0.4rem;
      };
      @media ${device.tablet} {
        width: auto;
        min-height: 45px;
        margin: 0 0 5px 0;
        padding: 15px;
        font-size: 1rem;
      }

      `;
  
   