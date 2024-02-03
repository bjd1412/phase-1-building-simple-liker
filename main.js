// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
document.addEventListener('DOMContentLoaded', () => {
const likerr = document.querySelectorAll('.like-glyph')
likerr.forEach(like => like.addEventListener('click', likeClick))

console.log(likerr)
})

const likeClick = (e) => {
 const like = e.target
 console.log(like)
 const likeIdNum = document.getElementById('201811189')
 let likingIt;
 if(like.className === 'like-glyph') {
  likingIt = 'true'
 }
 else if(like.className === 'activated-heart') {
  likingIt = 'false'
}
mimicServerCall(url=`http://mimicServer.example.com/${likeIdNum}`, {
method: 'PATCH',
headers:{
 'Content-Type':'application/json'
},
body: JSON.stringify({
  like: likingIt
})
})
.then(result => {
  if(result && likingIt === 'true') {
    like.innerText = FULL_HEART
    like.setAttribute('class', 'activated-heart')
  }else if(result && likingIt === 'false'){
    like.innerText = EMPTY_HEART
    like.setAttribute('class', 'like-glyph')
  }
})
.catch(error => {
  modal.innerText = error
  modal.setAttribute('class', '')
  setTimeout('modal.setAttribute("class", "hidden")',3000)
})

}











//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
