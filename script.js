const figures = document.querySelectorAll('.figures div');
const box = document.querySelector('.box');

let figuresPlaced = 0;

figures.forEach(figure => {
  figure.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', figure.className);
  });
});

box.addEventListener('dragover', (e) => {
  e.preventDefault();
});

box.addEventListener('drop', (e) => {
  e.preventDefault();
  const figureClass = e.dataTransfer.getData('text/plain');
  const figure = document.querySelector(`.${figureClass}`);
  if (!figure.classList.contains('placed')) {
    figure.classList.add('placed');
    figuresPlaced++;
    if (figuresPlaced === figures.length) {
      setTimeout(() => {
        swal("¡Logrado!", "Has completado el juego.", "success");
      }, 500);
      setTimeout(() => {
        swal.close();
      }, 5000);
    }
  }
});




const keys = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

const timestamps = [];

timestamps.unshift(getTimestamp());

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomKey() {
  return keys[getRandomNumber(0, keys.length-1)]
}

function targetRandomKey() {
  const key = document.getElementById(getRandomKey());
  key.classList.add("selected");
  let start = Date.now()
}

function getTimestamp() {
  return Math.floor(Date.now() / 1000)
}

document.addEventListener("keyup", event => {
  const keyPressed = String.fromCharCode(event.keyCode);
  const keyElement = document.getElementById(keyPressed);
  const highlightedKey = document.querySelector(".selected");
  
  keyElement.classList.add("hit")
  keyElement.addEventListener('animationend', () => {
    keyElement.classList.remove("hit")
  })
  
  if (keyPressed === highlightedKey.innerHTML) {
    timestamps.unshift(getTimestamp());
    const elapsedTime = timestamps[0] - timestamps[1];
    console.log(`Character per minute ${60/elapsedTime}`)
    highlightedKey.classList.remove("selected");
    targetRandomKey();
  } 
})

targetRandomKey();






//play


