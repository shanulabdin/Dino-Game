let game = document.getElementById('game');
let dino = document.getElementById('dino');

let isJumping = false;
let isGameOver = false;


function jump(){
  if(isJumping || isGameOver) return;
  
  isJumping = true;
  dino.classList.add('animate');

  setTimeout(function(){
    dino.classList.remove('animate');
    isJumping = false;
  }, 300)
}

document.addEventListener('click', function(){
  jump();
})
document.addEventListener('keydown', function(){
  jump();
})

function isCollision(dino, cactus){
  const dinoBox = dino.getBoundingClientRect();
  const cactusBox = cactus.getBoundingClientRect();

  return !(
    dinoBox.bottom < cactusBox.top ||
    dinoBox.top > cactusBox.bottom ||
    dinoBox.right < cactusBox.left ||
    dinoBox.left > cactusBox.right
  );
}

const GAME_WIDTH = game.clientWidth;

function createCactus(){
  if (isGameOver) return;

  const cactus = document.createElement('div');
  cactus.className = 'cactus';
  cactus.style.left = GAME_WIDTH + 'px';

  game.appendChild(cactus);

  const speed = 9;

  function move() {
    if (isGameOver) {
      if (cactus.parentNone) cactus.parentNode.removeChild(cactus);
      return;
    }
    let left = parseFloat(cactus.style.left);
    left -= speed;
    cactus.style.left = left + 'px';

    if (isCollision(dino, cactus)){
      gameOver();
      return;
    }

    if(left < -50) {
      if(cactus.parentNode) cactus.parentNode.removeChild(cactus);
      return;
    }

    requestAnimationFrame(move);
  }
  requestAnimationFrame(move);

  const min = 500;
  const max = 1200;
  const delay = Math.random() * (max - min) + min;
  setTimeout(createCactus, delay);
}

createCactus();

function gameOver() {
  isGameOver = true;
  alert('game Over!')
}