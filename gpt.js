const game = document.getElementById('game');
const dino = document.getElementById('dino');

let isJumping = false;
let isGameOver = false;

// --- Jump logic (same as before, using a flag so timers don't stack) ---
function jump() {
  if (isJumping || isGameOver) return;
  isJumping = true;
  dino.classList.add('animate');
  setTimeout(() => {
    dino.classList.remove('animate');
    isJumping = false;
  }, 500);
}

document.addEventListener('keydown', e => { if (e.code === 'Space') jump(); });
document.addEventListener('click', () => jump());

// --- Collision detection using bounding boxes ---
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


// --- Create obstacles recursively with random spawn delay ---
const GAME_WIDTH = game.clientWidth;

function createCactus() {
  if (isGameOver) return;             // stop spawning after game over

  const cactus = document.createElement('div');
  cactus.className = 'cactus';
  cactus.style.left = GAME_WIDTH + 'px'; // start just outside right edge
  game.appendChild(cactus);

  // movement speed in pixels per frame (tune this)
  const speed = 6; // bigger -> faster obstacles

  // movement using requestAnimationFrame for smooth animation
  function move() {
    if (isGameOver) {
      if (cactus.parentNode) cactus.parentNode.removeChild(cactus);
      return;
    }
    let left = parseFloat(cactus.style.left);
    left -= speed; // move left
    cactus.style.left = left + 'px';

    // check collision with player
    if (isCollision(dino, cactus)) {
      gameOver();
      return;
    }

    // remove when off-screen (left < -width of obstacle)
    if (left < -50) {
      if (cactus.parentNode) cactus.parentNode.removeChild(cactus);
      return;
    }

    requestAnimationFrame(move);
  }
  requestAnimationFrame(move);

  // schedule next cactus spawn with random delay (700ms - 2000ms)
  const min = 700;
  const max = 2000;
  const delay = Math.random() * (max - min) + min;
  setTimeout(createCactus, delay);
}

// start first cactus
// createCactus();

const startBtn = document.getElementById('startBtn');

startBtn.addEventListener('click', () => {
  if(isGameOver) return;
  createCactus();
  startBtn.style.display = 'none';
  console.log('start')
})

function gameOver() {
  isGameOver = true;
  alert('Game Over!');
  // optionally: show restart button, stop all animations, etc.
}
