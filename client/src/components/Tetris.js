import React, { useState, useEffect, useContext } from 'react';

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
import { useAuth } from '../hooks/auth.hook';
import { useMiniStage } from '../hooks/useMiniStage';


// Components
import Stage from './Stage';
import Display from './Display';
import Button from './Button';
import DisplayForNextTetro from './DisplayForNextTetro';
import Clock from './Clock';
import ModalWindow from './ModalWindow';
import { createMiniStage } from '../gameHelpers';

export const Tetris = () => {
  const storageName = 'userData';
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [active, setActive] = useState(true);
  
  const auth = useContext(AuthContext);
  const message = useMessage();
  const {request} = useHttp();
  
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel, restorescore, maxScore, setMaxScore] = useGameStatus(rowsCleared);
  const { login, logout, token, userId } = useAuth();

  const [miniStage, setMiniStage] = useMiniStage(player, resetPlayer);
console.log('from Tetris Score=', score);
 console.log('from Tetris miniStage=', miniStage);
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
    resetPlayer();
   // setMiniStage();
    setScore(0);
    setRows(0);
    setLevel(0);
    setGameOver(false);
    setPlaying(true);
    
  };

  const continuePrevGame = () => {
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
  //  setMiniStage();
    setScore(score);
    setRows(rows);
    setLevel(level);
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
        setActive(false);
      
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
       if (keyCode === 37) {//LEFT
        movePlayer(-1);
      } else if (keyCode === 39) {//RIGHT
        movePlayer(1);
      } else if (keyCode === 40) {//DOWN
        dropPlayer();
      } else if (keyCode === 38) {//UP
        playerRotate(stage, 1);
      } else if (keyCode === 67) {//keyC
        continuePrevGame();
      } else if (keyCode === 80) {//keyP
        dropTime ? pause() : play();
      } else if (keyCode === 82) {//keyR
        startGame();
      } else if (keyCode === 83) {//keyS
        saveScoreHandler(score, rows, level);
      }
    }
  };
  
  const saveLocalStatusGame = () => {
    localStorage.setItem(storageName, JSON.stringify({
      userId: userId,
      token: auth.token,
      score: score,
      rows: rows,
      level: level,
      maxScore: maxScore,
      userName: auth.userName
    }));
  };

  const restoreScoreFromStorage = () => {
    const data = JSON.parse(localStorage.getItem(storageName));
    console.log('restoreScoreFromStorage',data);
        if(data && data.token) {
     restorescore(data.score, data.rows, data.level, data.maxScore);
  }};

  useEffect(() => {
    restoreScoreFromStorage();
  }, [userId]);

 

  const saveScoreHandler = async () => {
    try{
      console.log('send score=', score);
      if (score > maxScore) setMaxScore(score);
      const data = await request('/api/game/savescore', 'POST', {
        userId: userId,
        score: score,
        rows: rows, 
        level: level,
        maxScore: maxScore,
        userName: auth.userName
      }, {Authorisation: `Bearer ${auth.token}`});
      //save to storage
      localStorage.setItem(storageName, JSON.stringify({
        userId: userId,
        token: auth.token,
        score: score,
        rows: rows,
        level: level,
        maxScore: maxScore,
        userName: auth.userName
    }));
      console.log('SAVE request=', data);
        message(data.message);
       
    } catch(e){}
  };

  

  // const gameOverHandler = async () => { 

  //     if(gameOver){
  //       setScore(0);
  //       setRows(0);
  //       setLevel(0);

  //     };
  //     const data = await request('/api/game/gameover', 'POST', {
  //       userId: userId,
  //       score: score,
  //       rows: rows, 
  //       level: level,
  //       maxScore: maxScore,
  //       userName: auth.userName
  //     }, {Authorisation: `Bearer ${auth.token}`});
  //     //save to storage
  //     localStorage.setItem(storageName, JSON.stringify({
  //       userId: userId,
  //       token: auth.token,
  //       score: score,
  //       rows: rows,
  //       level: level,
  //       maxScore: maxScore,
  //       userName: auth.userName
  //       }));
    
  //     };

  const handleClickPauseButton = (e) => {
    const callback = dropTime ? pause : play;
    callback(e);
    saveLocalStatusGame();
  };

  return (
    <StyledTetrisWrapper
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}
    >
        <StyledTetris>
        {(gameOver && !active) && (

          <div className="overlay" onClick={(e) => setActive(true)} >
            <ModalWindow  gameOver={gameOver} 
                          title="Game Over" 
                          text="Start a new game!" 
                          style={active ? {display: 'none'} : {display: 'flex'}}/>
          </div> 
        )}
        <Stage stage={stage} />
        <aside>
          <Display text={`Score: ${score}`} />
          <Display text={`Rows: ${rows}`} />
          <Display text={`Level: ${level}`} />
          <Clock />
          <DisplayForNextTetro  text='NEXT: ' miniStage={createMiniStage()} player={player}> </DisplayForNextTetro>
          <Button callback={startGame} text={'New Game (R)'}/>

          {!gameOver && (
            <>
              <Button callback={continuePrevGame} text={'Continue (C)'}/>
              <Button callback={saveScoreHandler} text={'Save (S)'}/> 

              {isPlaying ? (
                <Button callback={handleClickPauseButton} text={dropTime ? 'Pause (P)' : 'Play (P)'} />
              ) : null}
              
              
            </>
              
            )}
          
        </aside>
      </StyledTetris> 
  
    </StyledTetrisWrapper>
  );
};

export default Tetris;
