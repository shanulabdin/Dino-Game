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


const gameWidth = game.clientWidth

const cactus = document.createElement('div');
cactus.className = 'cactus';
cactus.style.left = gameWidth + 'px'
game.appendChild(cactus);

console.log(cactus.style.left)


function move(){
  let left = parseFloat(cactus.style.left);
  left -= 5
  cactus.style.left = left + 'px'
  
  if(left < -50){
    cactus.remove();
  }
  requestAnimationFrame(move);
}
move()