import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';

import { createStage, checkCollision } from '../gameHelpers';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';
import { randomTetromino } from './../tetrominos';
import { AuthContext } from '../context/AuthContext';
import {useMessage} from './../hooks/message.hook';
import {useHttp} from './../hooks/http.hook';

// Custom Hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';
// import { useMiniStage } from '../hooks/useMiniStage';


// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import PauseButton from './PauseButton';
// import DisplayForNextTetro from './DisplayForNextTetro';
import Clock from './Clock';
import SaveButton from './SaveButton';
import { useAuth } from '../hooks/auth.hook';

export const Tetris = () => {
  const storageName = 'userData';
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  
  const auth = useContext(AuthContext);
  const message = useMessage();
  const {request} = useHttp();
  
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel,restorescore] = useGameStatus(rowsCleared);
  const { login, logout, token, userId } = useAuth();
  // const [miniStage, setMiniStage] = useMiniStage(figure, resetPlayer);
console.log('from Tetris Score=',score);
  // console.log(player);
  // console.log(tetroForDisplay);
  // console.log(miniStage);
  const restoreScoreFromStorage = () => {
    const data = JSON.parse(localStorage.getItem(storageName));
    console.log('restoreScoreFromStorage',data);
        if(data && data.token) {
     restorescore(data.score, data.level);
  }};

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
    resetPlayer();
    // setMiniStage();
    setScore(score);
    setLevel(level);
    
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

  const saveScoreHandler = async () => {
    try{
      console.log('send score=', score);
      const data = await request('/api/game/savescore', 'POST', {userId: userId, score: score, level: level}, {
        Authorisation: `Bearer ${auth.token}`
      });
      //save to storage
      localStorage.setItem(storageName, JSON.stringify({
        userId: userId,
        token: auth.token,
        score: score,
        level: level
    }));
     // auth.savescore();
      console.log('SAVE request=', data);
        message(data.message);
       
    } catch(e){}
  };

  const move = ({ keyCode }) => {
    if (!gameOver && isPlaying) {
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
      } else if (keyCode === 83) {//keyS
        saveScoreHandler(score, level);
      }
    
    }
  };
  useEffect(() => {
    restoreScoreFromStorage();
    
}, [userId]);

  return (
    <StyledTetrisWrapper
   
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>

          {gameOver && (
            <Display gameOver={gameOver} text="Game Over" />
          )} 
          
          <Display text={`Score: ${score}`} />
          <Display text={`Rows: ${rows}`} />
          <Display text={`Level: ${level}`} />
   
          <SaveButton callback={saveScoreHandler}/> 
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
//<DisplayForNextTetro text={`Next: `} miniStage={miniStage} nextPiece={figure.next}/>