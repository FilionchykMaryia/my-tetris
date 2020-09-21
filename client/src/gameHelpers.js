export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () => Array(STAGE_WIDTH).fill([0, 'clear']));


//проверка столкновений
export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  // Using for loops to be able to return (and break). Not possible with forEach
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      //1.проверяем, заполнена ли клетка
      if (player.tetromino[y][x] !== 0) {
        if (
          //2.проверяем, находится ли ход в пределах поля по высоте(y)
          //тетрамино не должно уходить за нижний край поля
          !stage[y + player.pos.y + moveY] ||
          //3.проверяем, находится ли ход в пределах поля по ширине (x)
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          //4.проверяем, что ячейка, в которую перемещаемся, не собирается очиститься
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
            'clear'
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

export const createMiniStage = () =>
  Array.from(Array(4), () => Array(4).fill([0, 'clear']));

