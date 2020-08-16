import styled from 'styled-components';
import bgImage from '../../img/background.png';

export const StyledAuthPage = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(rgba(29,35,53, 0.8) 10%, rgba(17,23,41, 0.8) 80%), 
        url(${bgImage});
  
    background-size: cover;
    overflow: hidden;
    /* filter: brightness(40%); */
    display: flex;
    justify-content: center;
    align-items: center;
    
`;

export const Wrapper = styled.div`
    background: rgba(0,5,23,0.6);
    color: white;
    padding: 60px;
    box-shadow: 0px 0px 28px 0px rgba(0,5,23,0.6);
    font-family: Pixel, Arial, Helvetica, sans-serif;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;

`;

export const Title = styled.h1`
    align-items: center;
    display: inline-block;
    vertical-align: top;
    margin: 4rem;
    
  
`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const CardAction = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    /* margin: 10px 0; */
    /* padding: 10px; */
    width: 70%;
`;

export const CardContent = styled.div`
    width: 100%;
    
    .div {
        margin: 20px;
        display: flex;
        width: 100%;
        
        
    }
    
`;

export const CardTitle = styled.span`
    margin: 5rem;
`;

export const InputField = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 10px 0;
    padding: 10px;
`;

export const Input = styled.input`
    padding: 10px;
    background: transparent;
    border: none;
    outline: none;
    color: white;
    width: 100%;

    :focus{
        border-bottom: 2px solid white;
    }

    ::placeholder{
        color: rgba(26,53,119);
    }
`;
export const Label = styled.label`
  font-size: 12px;
`;


