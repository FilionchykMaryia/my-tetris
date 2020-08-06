import { useState, useCallback, useEffect } from 'react';
import { useGameStatus } from './useGameStatus';


const storageName = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserid] = useState(null);
  // const [score, setScore, rows, setRows, level, setLevel, restorescore] = useGameStatus();

    const login =(jwtToken, id, score, level) => {
        setToken(jwtToken);
        setUserid(id);
        
        localStorage.setItem(storageName, JSON.stringify({
            userId: id,
            token: jwtToken,
            score: score,
            level: level
        }));
    };

    const logout = useCallback(() => {
        setToken(null);
        setUserid(null);
        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));
console.log('data from UseEffect login',data);
        if(data && data.token) {
            login(data.token, data.userId,data.score, data.level);
           // restorescore(data.score, data.level);
        }
    }, [login]);

    
 

    return { login, logout, token, userId }
}