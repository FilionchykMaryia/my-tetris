import React, {useContext, useState, useEffect, useCallback} from 'react';
import {
    StyledPage,
    Wrapper,
    Title,
    Card,
} from '../components/styles/StyledPage';
import {useHttp} from './../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import {Loader} from './../components/Loader';
import {UsersList} from './../components/UsersList';

export const RatingPage = () => {
    const [users, setUsers] = useState([]);
    const {token} = useContext(AuthContext);
    const {loading, request} = useHttp();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = useCallback(async () => {
        try {
           
            const users = await request('/api/rating/', 'GET', null, {Authorization: `Bearer ${token}`});
            setUsers(users);
           
        } catch (e){console.log(e);}
    }, [token, request]);

  

    if (loading) {
        return <Loader />
    }

    console.log(users);

    return (
        <StyledPage>
            {!loading && 
                <Wrapper>
                    <Title>TOP 5</Title>
                    <Card >
                        <UsersList users={users}/>
                    </Card>
                </Wrapper>
            }
        </StyledPage>
    )
};