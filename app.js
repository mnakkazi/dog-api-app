/* =========================================
   VARIABLES
========================================== */   

const select = document.getElementById('breeds');
const card = document.querySelector('.card');
const form = document.querySelector('form');


/* =========================================
   FETCH FUNCTIONS
========================================== */ 

function fetchData(url) {
    return fetch(url)
      .then(resp => {
        if (!resp.ok) {
            throw new Error(`HTTP error: ${resp.status}`);
        }
        return resp.json();
      })
      .catch(err => console.log('Looks like there was a problem', err))
}

fetchData('https://dog.ceo/api/breeds/list/all')
  .then(data => generateOptions(Object.keys(data.message)))

fetchData('https://dog.ceo/api/breeds/image/random')
  .then(data => generateImage(data.message))


/* =========================================
   USING PROMISE.ALL
========================================== */  

// Promise.all([
//     fetchData('https://dog.ceo/api/breeds/list/all'),
//     fetchData('https://dog.ceo/api/breeds/image/random')
// ])
//   .then(data => {
//     const selectOptions = Object.keys(data[0].message);
//     const imageGenerated = data[1].message;

//     generateOptions(selectOptions);
//     generateImage(imageGenerated);
//   })


/* =========================================
   HELPER FUNCTIONS
========================================== */ 

function generateOptions(data) {
    const options = data.map(item => `
    <option value='${item}'>${item}</option>
    `);

    select.innerHTML = options;
}

function generateImage(data) {
    const html = `
      <img src='${data}' alt>
      <p>Click to view images of ${select.value}s</p>`;

    card.innerHTML = html;  
}

function fetchBreedImage() {
    const breed = select.value; 
    const img = card.querySelector('img');
    const p = card.querySelector('p');

    fetchData(`https://dog.ceo/api/breed/${breed}/images/random`)
      .then(data => {
        img.src = data.message;
        img.alt = breed;
        p.textContent = `Click to view more ${breed}s`;
      });
}


/* =========================================
   EVENT LISTENERS
========================================== */

select.addEventListener('change', fetchBreedImage);
card.addEventListener('click', fetchBreedImage);
form.addEventListener('submit', postData);


/* =========================================
   POST DATA
========================================== */   

function postData(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    // send data
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, comment })
    }

    fetch('https://jsonplaceholder.typicode.com/comments', config)
      .then(resp => {
        if(!resp.ok) {
            throw new Error(`HTTP Error: ${resp.status}`);
        }
        return resp.json();
      })
      .then(data => console.log(data))
}