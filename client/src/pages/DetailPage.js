import React, {useContext, useState, useEffect, useCallback} from 'react';
import {useParams} from 'react-router-dom';
import {StyledButton} from './../components/styles/StyledButton';
import {
    StyledAuthPage, 
    Wrapper,
    Title,
    Card,
    CardContent,
    CardTitle,
    InputField, 
    Input,
    Label,
    CardAction
} from './../pages/styles/StyledAuthPage';
import {useHttp} from './../hooks/http.hook';
import {useMessage} from './../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

export const DetailPage = () => {
    const {token} = useContext(AuthContext);
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request} = useHttp();
    const userId = useParams().id;
    const [details, setDetails] = useState(null);

    const getDetails = useCallback(async () => {
        try{
            const fetched = await request('/api/details/${userId}', 'GET', {
                Authorization: `Bearer ${token}`
            });
            setDetails(fetched);
            console.log('From getDetails Data=', fetched);
                   
        } catch(e){}
    }, [token, userId, request]);

    useEffect(() => {
        getDetails()
    }, [getDetails]);

    return (
        <>
        <h1>DetailPage</h1>

        <table>
        <thead>
        <tr>
            <th>Name</th>
            <th>Current Score</th>
            <th>Cleared Rows</th>
            <th>Current Level</th>
            <th>Max Score</th>
        </tr>
        </thead>

        <tbody>
            <tr>
                {/* <td>{fetched.name}</td>
                <td>{fetched.currScore}</td>
                <td>{fetched.currRows}</td>
                <td>{fetched.currLevel}</td>
                <td>{fetched.currLevel}</td>
                <td>{fetched.maxScore}</td> */}
            </tr>       
        </tbody>
        </table>

        </>
    )
};