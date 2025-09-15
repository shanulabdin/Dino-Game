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
scoreElement.textContent = 'Year : 0';


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
  scoreElement.textContent = 'Year : 0';

  createCactus();
}

let messageShow = false;

let messageContainer = document.querySelector('.messageContainer');
let message = document.querySelector('.message');


let imgs = [
  `url('images/mom.png') center/cover`,
  `url('images/pop.png') center/cover`,
  `url('images/sam.png') center/cover`
]
// Create cactus
function createCactus() {
  if (isGameOver) return;

  const cactus = document.createElement('div');
  cactus.className = 'cactus';
  cactus.style.left = '700px';
  game.appendChild(cactus);
  

let randomImg = imgs[Math.round(Math.random() * imgs.length)]

  if(score > 0){
    message.textContent = 'Your journey begins, Happy birthday!!';
    dino.style.background = `url('images/fam1.png') center/cover`;
    dino.style.width = '65px';
    dino.style.height = '60px';

    cactus.style.background = `url('images/mom.png') center/cover`;
    cactus.style.width = '60px';
    cactus.style.height = '70px';
  } 
  if(score >= 5){
    message.textContent = 'Five years of pure cuteness already';
  } 
  if(score >= 8){
    message.textContent = 'Warning! obstacle after 12 is SCARY!';
  } 
  if(score >= 12){
    message.textContent = 'The teen years!';
    dino.style.background = `url('images/fam2.png') center/cover`;
    dino.style.width = '55px';
    dino.style.height = '60px';
    
    cactus.style.background = `url('images/pop.png') center/cover`;
  }
  if(score >= 17){
    message.textContent = 'Don’t worry, it’ll be over in 5 years.';
  } 
  if(score >= 19){
    message.textContent = 'Almost grown.';
  } 
  if(score >= 22){
    message.textContent = 'Adulthood unlocked!';
    dino.style.background = `url('images/fam.png') center/cover`;
    dino.style.width = '55px';
    dino.style.height = '60px';

    cactus.style.background = `url('images/sam.png') center/cover`;
    cactus.style.width = '60px';
    cactus.style.height = '70px';
    cactus.style.bottom = '-4px';
  } 
  if(score > 27){
    message.textContent = 'Happy 27th Birthday!';
    cactus.style.background = randomImg;
  } 
  if(score > 28){
    message.textContent = 'Wishing you love and laughter';
  } 
  if(score > 30){
    message.textContent = 'Challenge! Cross 100';
  } 
  if(score > 40){
    message.textContent = 'keep going! you are doing great';
  } 
  if(score > 50){
    message.textContent = 'Half a century? Amazing';
  } 
  if(score > 60){
    message.textContent = 'Sixty?! Don’t worry,';
  } 
  if(score > 65){
    message.textContent = 'you still look 21 from a distance';
  } 
  if(score > 70){
    message.textContent = 'You’re still alive?';
  } 
  if(score > 80){
    message.textContent = 'YOU ARE A LEGEND!';
  } 
  if(score > 90){
    message.textContent = 'Just 10 more for a century';
  } 
  if(score > 100){
    message.textContent = 'A whole century of awesomeness, keep overcoming every obstacle like this, you are amazing! Happy birthday!';
  }
  if(score > 120){
    message.textContent = '"Immortal Mode"';
  }


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
      scoreElement.textContent = 'Year : ' + score;
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
function playMusic() {
  if (isMusic && music.paused) {
    music.play();
    music.volume = 0.5;
  }
}

window.addEventListener('click', playMusic);
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') playMusic();
});

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
musicBtn.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
  }
});

music.volume = 0.5;

