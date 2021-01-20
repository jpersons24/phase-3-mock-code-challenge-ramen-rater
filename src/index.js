
// VARIABLES

const imgContainer = document.querySelector('#ramen-menu')



// NETWORK REQUESTS

// fetch('http://example.com/movies.json')
//   .then(response => response.json())
//   .then(data => console.log(data));

getAllRamens()

function getAllRamens() {
   fetch("http://localhost:3000/ramens")
   .then(response => response.json())
   .then(allRamenObjects => {
      // console.log(allRamenObjects)
      allRamenObjects.forEach(ramenObj => {
         renderRamenObj(ramenObj)
      })
   })
}



// RENDER FUNCTIONS


function renderRamenObj(ramenObj) {
   const imgTag = document.createElement('img')
   imgTag.setAttribute('src', ramenObj.image)
   imgTag.setAttribute('alt', 'Image of menu item')

   imgContainer.append(imgTag)
}
