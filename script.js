let game = document.getElementById('game');
let dino = document.getElementById('dino');

// jumping animation
let isJumping = false;

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


// collision detection
function isCollision(dino, cactus){
  const dinoBox = dino.getBoundingClientRect();
  const cactusBox = cactus.getBoundingClientRect();

  return !(
    dinoBox.top > cactusBox.bottom ||
    dinoBox.bottom < cactusBox.top ||
    dinoBox.right < cactusBox.left || 
    dinoBox.left > cactusBox.right
  )
}


// start button
const startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', () => {
  
  isGameOver = false;

  createCactus();
  startBtn.style.display = 'none';
})


// create the cactuses and check if the game is over
let isGameOver = false;

function createCactus(){

  const cactus = document.createElement('div');
  cactus.className = 'cactus';
  cactus.style.left = 500 + 'px';

  game.appendChild(cactus);
  
  // cactus animation
  function move(){
    if(isGameOver) return;

    if(isCollision(dino, cactus)){
      gameOver();
    }

    let left = parseFloat(cactus.style.left);
    left -= 8 ;
    cactus.style.left = left + 'px';

    if(left < -50){
      cactus.remove()
    }
    requestAnimationFrame(move)
  }
  move();

  const min = 500;
  const max = 1500;
  const delay = Math.random() * (max - min) + min;
  setTimeout(createCactus, delay);
}


// replay button
const againBtn = document.getElementById('againBtn');
againBtn.addEventListener('click', () => {
  location.reload();
})
againBtn.style.display = 'none';


// game over
function gameOver(){
  isGameOver = true;
  againBtn.style.display = '';
}