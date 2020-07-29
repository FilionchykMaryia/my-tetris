import React, { useState, useEffect } from 'react';

import { createStage, checkCollision } from '../gameHelpers';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';
import { randomTetromino } from './../tetrominos';

// Custom Hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';
import { useMiniStage } from '../hooks/useMiniStage';


// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import PauseButton from './PauseButton';
import DisplayForNextTetro from './DisplayForNextTetro';
import Clock from './Clock';

export const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  
  
  
  const [player, updatePlayerPos, resetPlayer, playerRotate, figure, setFigure] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(figure, player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);
  const [miniStage, setMiniStage, updateMiniStage] = useMiniStage(figure, resetPlayer);


  console.log(player);
  // console.log(tetroForDisplay);
  // console.log(miniStage);

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      // Activate the interval again when user releases down arrow.
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1));
      }
    }
  };

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer(figure);
    setMiniStage(miniStage);
    setScore(0);
    setLevel(0);
    setRows(0);
    setGameOver(false);
    setPlaying(true);
    
    
  };
   const pause = () => {
     setDropTime(null);
   };
   const play = () => {
    setDropTime(1000 / (level + 1) + 200);
    setPlaying(true);
   };

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game over!
      if (player.pos.y < 1) {
        console.log('GAME OVER!!!');
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {
    // We don't need to run the interval when we use the arrow down to
    // move the tetromino downwards. So deactivate it for now.
    setDropTime(null);
    drop();
  };

  // This one starts the game
  // Custom hook by Dan Abramov
  useInterval(() => {
    drop();
  }, dropTime);

  const move = ({ keyCode }) => {
    if (!gameOver && isPlaying) {
      debugger;
       if (keyCode === 37) {//LEFT
        movePlayer(-1);
      } else if (keyCode === 39) {//RIGHT
        movePlayer(1);
      } else if (keyCode === 40) {//DOWN
        dropPlayer();
      } else if (keyCode === 38) {//UP
        playerRotate(stage, 1);
      } else if (keyCode === 80) {//keyP
        dropTime ? pause() : play();
      } else if (keyCode === 82) {//keyR
        startGame();
      }
    
    }
  };

  

  return (
    <StyledTetrisWrapper
     
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris nextPiece={figure.next} currentPiece={figure.current}>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
              <DisplayForNextTetro text={`Next: `} miniStage={miniStage} nextPiece={figure.next}/>
              
              
            </div>
          )}
          
          <StartButton callback={startGame} />
          {isPlaying ? (
                <PauseButton callback={dropTime ? pause : play} text={dropTime ? 'Pause (P)' : 'Play (P)'}/>
              ) : null}
          <Clock />
         
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
//