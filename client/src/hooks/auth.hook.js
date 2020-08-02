import { useState, useCallback, useEffect } from 'react';


const storageName = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserid] = useState(null);
    const [currScore, setCurrScore] = useState(0);
    const [currLevel, setCurrLevel] = useState(0);

    const login = useCallback((jwtToken, id, currScore, currLevel) => {
        console.log('(login) id,score,level=', id+", "+currScore+", "+currLevel);
        setToken(jwtToken);
        setUserid(id);
        setCurrScore(currScore);
        setCurrLevel(currLevel);
        console.log('login.currScore' , currScore);
        localStorage.setItem(storageName, JSON.stringify({
            userId: id,
            token: jwtToken,
            currScore: currScore,
            currLevel: currLevel
        }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserid(null);
        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));
        console.log('useEffect-login',data);
        if(data && data.token) {
            login(data.token, data.userId, data.currScore, data.currLevel);
        }
    }, [login]);

    return { login, logout, token, userId, currScore, currLevel }
}