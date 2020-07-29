import React, { useState, useEffect } from 'react';
import { StyledDisplay } from './styles/StyledDisplay';

export const Clock = () => {
    const [clock, setClock] = useState({
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString()
    });
    useEffect(() => {
        const id = setInterval(() => {
            setClock({
                time: new Date().toLocaleTimeString(),
                date: new Date().toLocaleDateString()
            });
        }, 1000);
        return () => clearInterval(id);
    }, []);


  return (
    <StyledDisplay style={{flexDirection: "column"}}>
        <div>{clock.time}</div>
        <br/>
        <div>{clock.date}</div>
    </StyledDisplay>
  );
};

export default Clock;