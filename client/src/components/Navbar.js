import React, {useContext} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import {StyledNavbar, Logo, Ul, Li} from './styles/StyledNavbar';

export const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history.push('/');
    };

    return (

    <StyledNavbar>

            <Logo href="/" >Tetris</Logo>
            <Ul >
                <Li><NavLink to="/game">Game</NavLink></Li>
                <Li><NavLink to="/details">Details</NavLink></Li>
                <Li><a href="/" onClick={logoutHandler}>Logout</a></Li>
            </Ul>
     
    </StyledNavbar>
    )
}