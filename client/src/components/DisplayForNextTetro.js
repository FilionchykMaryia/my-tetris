import React from 'react';
import { StyledDisplay } from './styles/StyledDisplay';
import { StyledMiniStage } from './styles/StyledMiniStage';
import Cell from './Cell';


const StageForDisplay = ({miniStage, player }) => (
    <StyledMiniStage width={miniStage[0].length} height={miniStage.length} >
        
      {player.tetrominoNext.forEach((row, y) => 
      {
        row.forEach((value, x) => {
          if (value !== 0) miniStage[y][x] = value; 
        });
      })}
      {miniStage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]}/>))}
      
    </StyledMiniStage>
  );



const DisplayForNextTetro = ({text, miniStage, player}) => (
  <StyledDisplay text={text} style={{paddingBottom: "20px"}}>
      <div>{text}</div>
      <StageForDisplay miniStage={miniStage} player={player}></StageForDisplay>

  </StyledDisplay>
);
export default DisplayForNextTetro;
