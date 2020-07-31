// import { useState, useEffect } from 'react';
// import { createMiniStage } from '../gameHelpers';
// import { TETROMINOS, randomTetromino} from '../tetrominos';



// export const useMiniStage = (figure, resetPlayer) => {
  
//   const [miniStage, setMiniStage] = useState(createMiniStage());
  
//   setMiniStage(
//     useEffect(({...figure}) => {
//       // Then draw the tetromino
//       figure.next.forEach((row, y) => {
//         row.forEach((value, x) => {
//           if (value !== 0) {
//             miniStage[y][x] = value;
//           };
//         });
//       });
  
//     // Here are the updates
  
//     }, [resetPlayer])
//   );
  
//   return [miniStage, setMiniStage];
// };
   