import { useState, useEffect, useCallback, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {useHttp} from './../hooks/http.hook';
import { useAuth } from '../hooks/auth.hook';

export const useGameStatus = (rowsCleared, login) => {
  
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  

  const linePoints = [40, 100, 300, 1200];
  const storageName = 'userData';
 
  const calcScore = useCallback(() => {
    // We have score
    if (rowsCleared > 0) {
      // This is how original Tetris score is calculated
      setScore(prev => prev + linePoints[rowsCleared - 1] * (level + 1));
      setRows(prev => prev + rowsCleared);
    }
  }, [level, linePoints, rowsCleared]);

  useEffect(() => {
    if(rowsCleared) calcScore();
    if (score > maxScore) setMaxScore(score);
  }, [calcScore, rowsCleared, score]);

  

  const restorescore = (score, rows, level, maxScore) => {
    if (score)  setScore(score);
    if (rows) setRows(rows);
    if (level) setLevel(level);
    if (maxScore) setMaxScore(maxScore);
    
    console.log('restoreScore in useAuth', score, rows, level, maxScore);
    //TODO почему не обновляется счетчик из хука SetScore
  };
 

  // useEffect(()=>{
  //   const data = JSON.parse(localStorage.getItem(storageName));
  //   console.log('gameStatus UseEffect',data);
  //   if(data && data.token) {
  //     restorescore(data.score, data.level);
  //   }
  // },[login]);

  return [score, setScore, rows, setRows, level, setLevel, restorescore, maxScore, setMaxScore];
};
