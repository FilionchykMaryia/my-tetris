import { useState, useCallback, useEffect } from 'react';


const storageName = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserid] = useState(null);
  

    const login =(jwtToken, id, score, rows, level, maxScore, dateMaxScore) => {
        setToken(jwtToken);
        setUserid(id);
        
        localStorage.setItem(storageName, JSON.stringify({
            userId: id,
            token: jwtToken,
            score: score,
            rows: rows,
            level: level,
            maxScore: maxScore,
            dateMaxScore: dateMaxScore,
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
            login(data.token, data.userId,data.score, data.rows, data.level, data.maxScore, data.dateMaxScore);
           // restorescore(data.score, data.level);
        }
    }, [login]);

    
 

    return { login, logout, token, userId }
}