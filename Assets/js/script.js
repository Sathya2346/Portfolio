// script.js
// Nav Bar

let togg = document.querySelector('.togg');
let media = document.querySelector('.media');
let CloseIcon = document.querySelector('.CloseIcon');
CloseIcon.addEventListener('click',function(){
  media.classList.remove('mediaActive');
});
togg.addEventListener('click', function(){
    media.classList.toggle('mediaActive');
});

            
            // Send
function send(){
  let name = document.getElementById('name').value.length;
  let email = document.getElementById('email').value.length;

  if(name >= 4 && email >= 4){
    alert("SuccessFully Message Send");
  }
  else{
    alert('Please Enter Valid Inputs');
  }
}