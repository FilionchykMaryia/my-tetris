import React, { useState, useEffect } from 'react';
import { StyledClock } from './styles/StyledClock';

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
    <StyledClock >
        <div>{clock.time}</div>

        <div>{clock.date}</div>
    </StyledClock>
  );
};

export default Clock;
