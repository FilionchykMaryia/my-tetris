import { useState, useEffect } from 'react';
import { createMiniStage } from '../gameHelpers';
import { TETROMINOS, randomTetromino} from '../tetrominos';



export const useMiniStage = (figure, resetPlayer) => {
  
  const [miniStage, setMiniStage] = useState(createMiniStage());
  
  
  useEffect(() => {

    const updateMiniStage = ({...figure}) => {
      
    
      
      // Then draw the tetromino
      figure.next.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            miniStage[y][x] = value;
          };
        });
      });
      return miniStage;
      
    };
  
    
    // Here are the updates
    
    setMiniStage(updateMiniStage(figure)); 
    
  }, [
    // player.collided,
    // player.tetromino,
    resetPlayer,
  ]);
  // debugger;
  return [miniStage, setMiniStage, updateMiniStage];
  
};
   