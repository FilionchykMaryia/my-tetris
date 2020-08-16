import { useState, useEffect } from 'react';
import { createMiniStage } from '../gameHelpers';
import { TETROMINOS, randomTetromino} from '../tetrominos';



export const useMiniStage = (player, resetPlayer) => {
  
  const [miniStage, setMiniStage] = useState(createMiniStage());
 
  //TODO вынести в useEffect
  //отрисовка фигуры в miniStage
  // const updateStage = (prevStage,tetromino) => {
  //   // First flush the stage
  //   const newStage = prevStage.map(row =>
  //     row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
  //   );

  //   // Then draw the tetromino
  //   tetromino.map((row, y) => {
  //     row.map((value, x) => {
  //       if (value !== 0) {
  //         newStage[y][x] = [
  //           value,
  //           `${player.collided ? 'merged' : 'clear'}`,
  //         ];
  //       }
  //     });
  //   });
   
  //   return newStage;
  // };
//   setMiniStage(
//     useEffect(({...player}) => {
//       // Then draw the tetromino
//       player.tetrominoNext.forEach((row, y) => {
//         row.forEach((value, x) => {
//           if (value !== 0) {
//             miniStage[y][x] = value;
//           };
//         });
//       });
  
//     // Here are the updates
  
//     }, [resetPlayer])
//   );

//setMiniStage(prev => updateStage(prev, player.tetrominoNext));

//   useEffect(() => {
//     // Then draw the tetromino
// PushMiniStage(miniStage,player.tetrominoNext);
// setMiniStage(miniStage);
//   // Here are the updates

//   }, [resetPlayer])

  
 
  return [miniStage, setMiniStage];
};
   