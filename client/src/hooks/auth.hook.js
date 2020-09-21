import { useState, useCallback, useEffect } from 'react';
import { useGameStatus } from '../hooks/useGameStatus';

const storageName = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [ready, setReady] = useState(false);
    const [userId, setUserid] = useState(null);
    const [userName, setUserName] = useState(null);
    const [score, setScore, rows, setRows, level, setLevel, maxScore, setMaxScore] = useGameStatus();

    const login = useCallback((jwtToken, id, score, rows, level, maxScore, userName) => {
        setToken(jwtToken);
        setUserid(id);
        setScore(score);
        setRows(rows);
        setLevel(level);
        setUserName(userName);
        
        localStorage.setItem(storageName, JSON.stringify({
            userId: id,
            token: jwtToken,
            score: score,
            rows: rows,
            level: level,
            maxScore: maxScore,
            userName: userName,
        }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserid(null);
        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));
    console.log('data from UseEffect login',data);
        if(data && data.token) {
            login(data.token, data.userId,data.score, data.rows, data.level, data.maxScore, data.userName);
           
        }
        setReady(true);
    }, [login]);

    
 

    return { login, logout, token, userId, userName, ready }
}