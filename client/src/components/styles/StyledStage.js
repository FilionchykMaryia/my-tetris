import styled from 'styled-components';
import device from './device';

export const StyledStage = styled.div`
  display: grid;
  grid-template-rows: repeat(
    ${props => props.height},
    calc(25vw / ${props => props.width})
  );
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-gap: 1px;
  /* border: 2px solid #333; */
  width: 100%; 
  height: ${props => props.height};
  max-height: ${props => props.height}; 
  max-width: 25vw;
  /* background: #111; */
  @media ${device.mobileS} {
    max-width: 55vw;
    grid-template-rows: repeat(
      ${props => props.height},
      calc(45vw / ${props => props.width})
    );
    grid-template-columns: repeat(
      ${props => props.width}, 
      calc(45vw / ${props => props.width})
      );
  };
  @media ${device.laptop} {
    grid-template-rows: repeat(
      ${props => props.height},
      calc(35vw / ${props => props.width})
    );
    grid-template-columns: repeat(
      ${props => props.width}, 
      calc(35vw / ${props => props.width})
      );
  }
  @media ${device.laptopL} {
    grid-template-rows: repeat(
      ${props => props.height},
      calc(25vw / ${props => props.width})
    );
    grid-template-columns: repeat(
      ${props => props.width}, 
      calc(25vw / ${props => props.width})
      );
  }
`;

