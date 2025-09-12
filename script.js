let dino = document.getElementById('dino');
let cactus = document.getElementById('cactus');

let isJumping = false;

function jump(){
  if(!isJumping){
    isJumping = true;
    dino.classList.add('animate');

    
    setTimeout(function(){
      dino.classList.remove('animate');
      isJumping = false;
    }, 500)
  }
}



let isDead = setInterval(function(){
  let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue('top'));

  let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue('left'));
  
  if(cactusLeft > 0 && cactusLeft < 20 && dinoTop >= 130){
    cactus.style.animation = 'none';
    alert('You Lose');
  }
}, 10);

document.addEventListener('click', function(){
  jump();
})
document.addEventListener('keydown', function(){
  jump();
})