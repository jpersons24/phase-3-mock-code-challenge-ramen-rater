
// VARIABLES

const imgContainer = document.querySelector('#ramen-menu')
const ramenDetails = document.querySelector('#ramen-detail')
const ratingForm = document.querySelector('#ramen-rating')


// NETWORK REQUESTS



getAllRamens()

function getAllRamens() {
   fetch("http://localhost:3000/ramens")
   .then(response => response.json())
   .then(allRamenObjects => {
      allRamenObjects.forEach(ramenObj => {
         renderRamenObj(ramenObj)
      })
      displayChosenRamen(allRamenObjects[0])
   })
}

function getOneRamen(id) {
   fetch(`http://localhost:3000/ramens/${id}`)
   .then(response => response.json())
   .then(ramenObj => {
      displayChosenRamen(ramenObj)
   })
}

function updateRamenObj(id, obj) {
   fetch(`http://localhost:3000/ramens/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
   })
}



// RENDER FUNCTIONS


function renderRamenObj(ramenObj) {
   const imgTag = document.createElement('img')
   imgTag.classList.add('ramen-image')
   imgTag.dataset.id = ramenObj.id
   imgTag.setAttribute('src', ramenObj.image)
   imgTag.setAttribute('alt', 'Image of menu item')

   imgContainer.append(imgTag)
}

function displayRamenDetails(event) {
   const img = event.target
   const id = img.dataset.id
   
   getOneRamen(id)
}

function displayChosenRamen(ramenObj) {
   ramenDetails.innerHTML = 
   `<img class="detail-image" src="${ramenObj.image}" alt="${ramenObj.name}" />
   <h2 class="name">${ramenObj.name}</h2>
   <h3 class="restaurant">${ramenObj.restaurant}</h3>`

   ratingForm.innerHTML = 
   `<label for="rating">Rating: </label>
   <input type="text" name="rating" id="rating" value="${ramenObj.rating}" />
   <label for="comment">Comment: </label>
   <textarea name="comment" id="comment" data-id="${ramenObj.id}">${ramenObj.comment}</textarea>
   <input type="submit" value="Update" />`
}



// EVENT LISTENERS


imgContainer.addEventListener('click', function(event) {
   if (event.target.matches('.ramen-image')) {
      displayRamenDetails(event)
   }
})

ratingForm.addEventListener('submit', function(event) {
   event.preventDefault()

   const rating = event.target.rating.value
   const comment = event.target.comment.value
   const id = event.target.comment.dataset.id

   const obj = {
      rating: rating,
      comment: comment
   }

   updateRamenObj(id, obj)
})
