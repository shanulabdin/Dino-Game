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



// Create cactus
function createCactus() {
  if (isGameOver) return;

  const cactus = document.createElement('div');
  cactus.className = 'cactus';
  cactus.style.left = '700px';
  game.appendChild(cactus);
  


    if(score > 0){
      message.textContent = 'Hiiiii, Happy BirthDay!!';
      dino.style.background = `url('images/fam1.png') center/cover`;
      dino.style.width = '65px';
      dino.style.height = '60px';

      cactus.style.background = `url('images/mom.png') center/cover`;
      cactus.style.width = '60px';
      cactus.style.height = '70px';
      
    } 
    if(score >= 5){
      message.textContent = 'Warning! obstacle after 12 is SCARY!';
    } 
    if(score >= 12){
      message.textContent = 'Dont worry, it`ll be over in 10 years.';
      dino.style.background = `url('images/fam2.png') center/cover`;
      dino.style.width = '55px';
      dino.style.height = '60px';
      
      cactus.style.background = `url('images/pop.png') center/cover`;
      // cactus.style.width = '50px';
      // cactus.style.height = '70px';
    }
    if(score >= 19){
      message.textContent = 'You`ll choose your own obstacle next';
    } 
    if(score >= 22){
      message.textContent = 'Haha, just kidding';
      dino.style.background = `url('images/fam.png') center/cover`;
      dino.style.width = '55px';
      dino.style.height = '60px';

      cactus.style.background = `url('images/sam.png') center/cover`;
      cactus.style.width = '60px';
      cactus.style.height = '70px';
      cactus.style.bottom = '-4px';
    } 
    if(score > 27){
      message.textContent = 'Challenge! reach 100 for a surprise';
    } 
    if(score > 37){
      message.textContent = 'Keep going!';
    } 
    if(score > 50){
      message.textContent = 'You`re doing great!';
    } 
    if(score > 60){
      message.textContent = 'Amazing!!!';
    } 
    if(score > 70){
      message.textContent = 'You still Alive?';
    } 
    if(score > 80){
      message.textContent = 'YOU ARE A LEGEND!';
    } 
    if(score > 90){
      message.textContent = 'Just 10 more for a century';
    } 
    if(score > 100){
      message.textContent = 'Keep over-comming all the obstacles in your life like this, you are amazing, Happy Birthday!';
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

