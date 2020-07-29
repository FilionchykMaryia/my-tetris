import React from 'react';
import { StyledDisplay } from './styles/StyledDisplay';

import Stage  from './Stage';
import styled from 'styled-components';
import { TETROMINOS } from '../tetrominos';
import { nextPiece } from './../components/Tetris';

import Cell from './Cell';

export const StyledMiniStage = styled.div`
  display: grid;
  grid-template-rows: repeat(${props => props.height}, 1fr);
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-gap: 1px;
  /* border: 2px solid #333; */
  width: 5px;
  height: 5px;
  max-height: ${props => props.height}; 
  max-width: 25vw; 
  background: #111;
  margin: 0 0 20px 20px;
`;



const StageForDisplay = ({ miniStage, nextPiece }) => (
    <StyledMiniStage width={miniStage[0].length} height={miniStage.length} >
      {miniStage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]}/>))}
    </StyledMiniStage>
  );

const DisplayForNextTetro = ({text, miniStage, nextPiece}) => (
    <StyledDisplay text={text} style={{paddingBottom: "20px"}}>
        <div >{text}</div>
        <StageForDisplay miniStage={miniStage} nextPiece={nextPiece}></StageForDisplay>

    </StyledDisplay>
);

export default DisplayForNextTetro;
