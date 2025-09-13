let game = document.getElementById('game');
let dino = document.getElementById('dino');
// let cactus = document.querySelector('.cactus');

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


setInterval(() => {
  console.log('collision?', isCollision(dino, cactus))
}, 1000)











// function isCollision(dino, cactus){
  //   const dinoBox = dino.getBoundingClientRect();
  //   const cactusBox = cactus.getBoundingClientRect();

//   return !(
//     dinoBox.bottom < cactusBox.top ||
//     dinoBox.top > cactusBox.bottom ||
//     dinoBox.right < cactusBox.left ||
//     dinoBox.left > cactusBox.right
//   );
// }

// const GAME_WIDTH = game.clientWidth;

// function createCactus(){
//   if (isGameOver) return;

//   const cactus = document.createElement('div');
//   cactus.className = 'cactus';
//   cactus.style.left = GAME_WIDTH + 'px';

//   game.appendChild(cactus);

//   const speed = 9;

//   function move() {
//     if (isGameOver) {
//       if (cactus.parentNode) cactus.parentNode.removeChild(cactus);
//       return;
//     }
//     let left = parseFloat(cactus.style.left);
//     left -= speed;
//     cactus.style.left = left + 'px';

//     if (isCollision(dino, cactus)){
//       gameOver();
//       return;
//     }

//     if(left < -50) {
//       if(cactus.parentNode) cactus.parentNode.removeChild(cactus);
//       return;
//     }

//     requestAnimationFrame(move);
//   }
//   requestAnimationFrame(move);

//   const min = 500;
//   const max = 1200;
//   const delay = Math.random() * (max - min) + min;
//   setTimeout(createCactus, delay);
// }

// // createCactus();


// const startBtn = document.getElementById('startBtn');

// startBtn.addEventListener('click', () => {
//   if(isGameOver) return;
//   createCactus();
//   startBtn.style.display = 'none';
// })

// function gameOver() {
//   isGameOver = true;
// }


































// function isCollision(dino, cactus){

//   const dinoBox = dino.getBoundingClientRect();
//   const cactusBox = cactus.getBoundingClientRect();
  
//   console.log('dino', dinoBox)
//   console.log('cactus', cactusBox)

//   return !(
//     dinoBox.bottom < cactusBox.top ||
//     dinoBox.top > cactusBox.bottom ||
//     dinoBox.right < cactusBox.left ||
//     dinoBox.left > cactusBox.right 
//   );
  
// }

// setInterval(() => {
//   console.log("Collision?", isCollision(dino, cactus));
// }, 2000);

