// write your code here!
document.addEventListener(`DOMContentLoaded`, init);

function addDucksToNav(){
    fetch(`http://localhost:3000/ducks`)
    .then(r => r.json())
    .then(ducks => ducks.forEach(duck => addDucksToNavHelper(duck)))
}


function addDucksToNavHelper(duckObj){
    const img = document.createElement(`img`);
        img.src = duckObj[`img_url`];
    const nav = document.querySelector(`#duck-nav`);
        nav.append(img);
    
    img.addEventListener(`click`, () => setScreen(duckObj));
}

function setScreen(duckObj){
    const title = document.querySelector(`#duck-display-name`);
    const duckimg = document.querySelector(`#duck-display-image`);
    const duckDispLikes = document.querySelector(`#duck-display-likes`);

    title.textContent = duckObj[`name`];
    duckimg.src = duckObj[`img_url`];
    duckDispLikes.textContent = duckObj[`likes`];

    duckDispLikes.addEventListener(`click`, () => {
        duckObj[`likes`] ++;
        duckDispLikes.textContent = duckObj[`likes`];
        fetch(`http://localhost:3000/ducks/${duckObj[`id`]}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(duckObj)
    })
    })
}

function addDuckHandler (e) {
    e.preventDefault();
    const nameInput = document.querySelector(`#duck-name-input`);
    const imgInput = document.querySelector(`#duck-image-input`);
  
    postNewDuck(nameInput.value, imgInput.value)
  }
  
  function postNewDuck(duckName, duckImg) {
    fetch("http://localhost:3000/ducks", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
          },
          body: JSON.stringify({
              name: duckName,
              img_url: duckImg,
              likes: 0,
          }),
      })
      .then(r => r.json())
      .then(ducks => addDucksToNavHelper(ducks))
  }





function init(){
    addDucksToNav();
    document.querySelector(`#new-duck-form`).addEventListener(`submit`, addDuckHandler)
}