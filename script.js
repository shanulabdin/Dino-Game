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