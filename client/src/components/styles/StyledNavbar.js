import styled from 'styled-components';
import device from './device';

export const StyledNavbar = styled.div`
    box-sizing: border-box;
    background: linear-gradient(rgba(0,5,23,0.9) 10%, rgba(17,23,41, 0.8) 80%);
    color: white;
    /* box-shadow: 0px 0px 28px 0px rgba(0,5,23,0.9); */
    font-family: Pixel, Arial, Helvetica, sans-serif;
    font-size: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    max-width: 100vw;
    background-size: cover;
    overflow: hidden;
    padding: 15px;
    @media ${device.mobileS} {
        justify-content: space-around;

    };
    @media ${device.tablet} {
        justify-content: space-between;
    };

`;

export const Logo = styled.span`
    color: white;
    font-size: 2rem;

    @media ${device.mobileS} {
        display: none;
    };
    @media ${device.tablet} {
        display: block;
    };

`;

export const Ul = styled.ul`
    display: flex;
    flex-direction: row;
    height: 100%;

`;

export const Li = styled.li`
    padding: 0 10px;
    width: 100%;
    height: 100%;
        :hover{
            border-bottom: 1px solid white;
            
        }
 
`;