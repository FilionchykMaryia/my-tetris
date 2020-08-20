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
import { useGameStatus } from '../hooks/useGameStatus';

export const DetailPage = () => {
    const {token} = useContext(AuthContext);
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request} = useHttp();
    const userId = useParams().id;
    const [score, rows, level, maxScore, setMaxScore] = useGameStatus();
    const storageName = 'userData';

    useEffect(() => {
        getDetailsHandler();
    }, [userId, maxScore]);


    const getDetailsHandler = async () => {
        try{
            console.log('send score=', score);
            const data = await request('/api/details/', 'GET', {
            userId: userId,
            score: score,
            rows: rows, 
            level: level,
            maxScore: maxScore,
            userName: auth.userName
            }, {Authorisation: `Bearer ${auth.token}`});
            //save to storage
            localStorage.setItem(storageName, JSON.stringify({
            userId: userId,
            token: auth.token,
            score: score,
            rows: rows,
            level: level,
            maxScore: maxScore,
            userName: auth.userName
        }));
            message(details.message);
        } catch(e){}
    };
    const details = JSON.parse(localStorage.getItem(storageName));
    console.log('DETAIL request=', details);

    return (
        <Wrapper>
            <Title>DetailPage</Title>
            <Card>
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
                        <td>{details.userName}</td>
                        <td>{details.score}</td>
                        <td>{details.rows}</td>
                        <td>{details.level}</td>
                        <td>{details.maxScore}</td>
                    </tr>       
                </tbody>
                </table>
            </Card>
        </Wrapper>
    )
};