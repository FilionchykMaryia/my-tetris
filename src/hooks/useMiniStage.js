import { useState, useEffect } from 'react';
import { createMiniStage } from '../gameHelpers';
import { TETROMINOS, randomTetromino} from '../tetrominos';


export const useMiniStage = (player, resetPlayer) => {
  
  // let tetroForDisplay = TETROMINOS[0].shape;
  const [miniStage, setMiniStage] = useState(createMiniStage());
  
  
  useEffect(() => {
   
  //   //создаем буферную переменную
  //   const tetroBuff = randomTetromino();

  // //копируем буферную переменную в nextTetro
  //   const getNextTetromino = (tetroBuff) => {
  //     tetroForDisplay = [...tetroBuff];
  //     return tetroForDisplay;
  //   };

  //   getNextTetromino(tetroBuff);

    const updateMiniStage = () => {
      const newMiniStage = createMiniStage();
      const tetroForDisplay = randomTetromino();
      console.log(tetroForDisplay);

      // Then draw the tetromino
      tetroForDisplay.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newMiniStage[y][x] = value;
          };
        });
      });
      return newMiniStage;
      
    };
  
    // Here are the updates
    
    setMiniStage(updateMiniStage());
    
  }, [
    player.collided,
    player.pos.x,
    player.pos.y,
    player.tetromino,
    resetPlayer,
  ]);
  // debugger;
  return [miniStage, setMiniStage];
  
};
  
   