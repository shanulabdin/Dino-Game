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
    dinoBox.top > cactusBox.bottom ||
    dinoBox.bottom < cactusBox.top ||
    dinoBox.right < cactusBox.left || 
    dinoBox.left > cactusBox.right
  )
}


const cactus = document.createElement('div');
cactus.className = 'cactus';
cactus.style.left = game.clientWidth + 'px';

game.appendChild(cactus);

// we set this to minus the amount from the cactus in future
const speed = 6;

function move() {
  let left = parseFloat(cactus.style.left);

  // minus the maount of speed from the left of cactus
  left -= speed;

  // set the style to cactus
  cactus.style.left = left + 'px'
  
  // makes the animation with the frame rate, instead of every milisecond with setInterval()
  requestAnimationFrame(move)
}
move()