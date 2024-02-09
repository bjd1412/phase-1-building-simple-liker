// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
document.addEventListener('DOMContentLoaded', () => {
  thelike = document.querySelectorAll('.like-glyph')
  thelike.forEach(likes => likes.addEventListener('click', likeBtn))
})

const likeBtn = (e) => {
  like = e.target
  likeID = e.target.parentNode.parentNode.parentNode.parentNode.id
  let likeState
  if(like.className === 'like-glyph'){
    likeState = 'noLike'
  }else if(like.className === 'activated-heart'){
    likeState = 'liked'
  }
  mimicServerCall(url=`http://mimicServer.example.com/${likeID}`,{
    method: 'PATCH',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      like: likeState
    })
  })
  .then(res => {
    if(res && likeState === 'noLike') {
      like.setAttribute('class', 'activated-heart')
      like.innerText = FULL_HEART
    }else if(res && likeState === 'liked') {
      like.setAttribute('class', 'like-glyph')
      like.innerText = EMPTY_HEART
    }
  })
.catch(error => {
  modal.innerText = error
    modal.setAttribute('class', '')
   setTimeout('modal.setAttribute("class", "hidden")'),3000
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
