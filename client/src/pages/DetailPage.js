import React, {useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {
    StyledPage,
    Wrapper,
    Title,
    Card 
} from '../components/styles/StyledPage';
import {useHttp} from './../hooks/http.hook';
import {useMessage} from './../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';
import { useGameStatus } from '../hooks/useGameStatus';

export const DetailPage = () => {
    // const {token} = useContext(AuthContext);
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {request} = useHttp();
    const userId = useParams().id;
    const [score, rows, level, maxScore] = useGameStatus();
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
            }, {Authorization: `Bearer ${auth.token}`});
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
        <StyledPage>
            <Wrapper>
                <Title>Detail Page</Title>
                <Card>
                    <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Current <br/>Score</th>
                        <th>Cleared <br/>Rows</th>
                        <th>Current<br/> Level</th>
                        <th>Max <br/>Score</th>
                    </tr>
                    </thead>

                    <tbody style={{color: "rgb(52,104,237)"}}>
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
        </StyledPage>
    )
};