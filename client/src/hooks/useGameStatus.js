import { useState, useEffect, useCallback, useContext } from 'react';
import {useAuth} from './auth.hook';

export const useGameStatus = (rowsCleared) => {
  const { login, logout, token, userId, currScore, currLevel } = useAuth();
  const [score, setScore] = useState(currScore);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(currLevel);



  const linePoints = [40, 100, 300, 1200]; 
  console.log(currScore, currLevel);

  const calcScore = useCallback(() => {
    // We have score
    if (rowsCleared > 0) {
      // This is how original Tetris score is calculated
      setScore(prev => prev + linePoints[rowsCleared - 1] * (level + 1));
      setRows(prev => prev + rowsCleared);
    }
  }, [level, linePoints, rowsCleared]);



  useEffect(() => {
    calcScore();
  }, [calcScore, rowsCleared, score]);

  useEffect(() => {
    
    setScore(currScore);
    setLevel(currLevel);
  }, [login]);

  return [score, setScore, rows, setRows, level, setLevel];
};
