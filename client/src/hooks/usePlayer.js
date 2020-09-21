import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino } from '../tetrominos';
import { STAGE_WIDTH, checkCollision } from '../gameHelpers';



export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape, //current Figure
    tetrominoNext: randomTetromino(),//next
    collided: false,
  });
 

  function rotate(matrix, dir) {
    // делаем так, чтобы строки стали столбцами
    const mtrx = matrix.map((_, index) => matrix.map(column => column[index]));
    // переворачиваем каждую строку, чтобы получить повернутую матрицу
    if (dir > 0) return mtrx.map(row => row.reverse());
    return mtrx.reverse();
  }

  function playerRotate(stage, dir) {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }
    setPlayer(clonedPlayer);
  }

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
  };

 
//выдача новой фигуры
  const resetPlayer = useCallback(() => {
   
    console.log('resetPlayer player.tet ', player.tetromino);
    console.log('resetPlayer player.next', player.tetrominoNext);
    
  
    setPlayer(prev => { 
      return {
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: prev.tetrominoNext,
      tetrominoNext: randomTetromino(),
      collided: false,
    }});
  }, []);

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};
