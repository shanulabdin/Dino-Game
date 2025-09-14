let game = document.getElementById('game');
let dino = document.getElementById('dino');
let startBtn = document.getElementById('startBtn');
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');

const jumpSound = document.querySelector('#jumpSound');
const dieSound = document.querySelector('#dieSound');

let isMusic = true;

let isJumping = false;
let isGameOver = false;
let cactusTimeouts = [];


// Jumping
function jump() {
  if (isJumping || isGameOver) return;

  isJumping = true;
  dino.classList.add('animate');

  setTimeout(() => {
    dino.classList.remove('animate');
    isJumping = false;
  }, 500);
  
  jumpSound.play();
}

document.addEventListener('click', jump);
document.addEventListener('keydown', (e) => {
  if(e.code === 'Space'){
    jump();
  }
});

// Collision
function isCollision(dino, cactus) {
  const dinoBox = dino.getBoundingClientRect();
  const cactusBox = cactus.getBoundingClientRect();

  return !(
    dinoBox.top > cactusBox.bottom ||
    dinoBox.bottom < cactusBox.top ||
    dinoBox.right < cactusBox.left ||
    dinoBox.left > cactusBox.right
  );
}


const scoreElement = document.querySelector('.score');

let score = 0;
scoreElement.textContent = 'Score : 0';


// Start Game
function startGame() {
  isGameOver = false;

  // Clear old timeouts
  cactusTimeouts.forEach(id => clearTimeout(id));
  cactusTimeouts = [];

  // Remove old cactuses
  document.querySelectorAll('.cactus').forEach(c => c.remove());

  startBtn.style.display = 'none';

  

  score = 0;
  scoreElement.textContent = 'Score : 0';
  music.play();
  music.volume = 0.5;
  createCactus();
}


// Create cactus
function createCactus() {
  if (isGameOver) return;

  const cactus = document.createElement('div');
  cactus.className = 'cactus';
  cactus.style.left = '700px';
  game.appendChild(cactus);

  function move() {
    if (isGameOver) return;

    if (isCollision(dino, cactus)) {
      gameOver();
    }

    let left = parseFloat(cactus.style.left);
    left -= 12;
    cactus.style.left = left + 'px';

    if (left < -50) {
      cactus.remove();
      score++;
      scoreElement.textContent = 'Score : ' + score;
      console.log(score);
    } else {
      requestAnimationFrame(move);
    }
  }
  move();

  const min = 500, max = 1500;
  const delay = Math.random() * (max - min) + min;
  const id = setTimeout(createCactus, delay);
  cactusTimeouts.push(id);
}

// Game over
function gameOver() {
  isGameOver = true;
  startBtn.style.display = '';
  dieSound.play();
}

// Start button
startBtn.addEventListener('click', startGame);


// Start game with Space key
document.addEventListener('keydown', (e) => {
  if(e.code === 'Space' && startBtn.style.display !== 'none'){
    startGame();
  }
})


// musicBtn
window.addEventListener('click', () => {
  if (isMusic && music.paused) {
    music.play();
    music.volume = 0.5;

  }
}, { once: true });

function musicControl(){
  if(isMusic){
    music.pause();
    isMusic = false;
  } else if (!isMusic){
    music.play();
    music.volume = 0.5;

    isMusic = true;
  }
}
musicBtn.addEventListener('click', () => {
  musicControl();
})


music.volume = 0.5;

