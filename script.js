let character = document.getElementById('character');
let block = document.getElementById('block');

let isJumping = false;

function jump(){
  if(!isJumping){
    isJumping = true;
    character.classList.add('animate');
    
    setTimeout(function(){
      character.classList.remove('animate');
      isJumping = false;
    }, 500);
  }
}

let checkDead = setInterval(function(){
  let characterTop = parseInt(window
    .getComputedStyle(character)
    .getPropertyValue('top'));

  let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));

  if(blockLeft > 50 && blockLeft < 70 && characterTop >= 130){
    block.style.animation = 'none';
    alert('u lose')
  }
}, 10)

document.addEventListener('keydown', function(key){
  if(key.code === 'Space'){
    jump();
  }
});

document.addEventListener('click', function(){
  jump();
})