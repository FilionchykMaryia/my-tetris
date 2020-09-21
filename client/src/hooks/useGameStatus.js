import { useState, useEffect, useCallback } from 'react';

export const useGameStatus = (rowsCleared, login) => {
  
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  

  const linePoints = [40, 100, 300, 1200];
 
  const calcScore = useCallback(() => {
    if (rowsCleared > 0) {
      // оригинальный рассчет очков Тетриса
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
    
  };
 
  return [score, setScore, rows, setRows, level, setLevel, restorescore, maxScore, setMaxScore];
};
