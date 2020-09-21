import styled from 'styled-components';
import device from './device';

export const StyledMiniStage = styled.div`
  display: grid;
  grid-template-rows: repeat(${props => props.height}, 1fr);
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-gap: 1px;
  /* border: 2px solid #333; */
  width: 5px;
  height: 5px;
  max-height: ${props => props.height}; 
  max-width: 25vw; 
  background: #111;
  margin: 0 0 20px 20px;

  @media ${device.mobileS} {
    width: 3px;
    height: 3px;
    margin: 0 0 14px 14px;
  };
  @media ${device.laptop} {
    width: 5px;
    height: 5px;
    margin: 0 0 20px 20px;
  };
`;