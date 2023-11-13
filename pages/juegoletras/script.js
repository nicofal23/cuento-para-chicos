const letterDisplay = document.getElementById('letter-display');
const textoElement = document.getElementById('texto');
const correctasElement = document.getElementById('correctas');
const incorrectasElement = document.getElementById('incorrectas');
const alphabet = ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'I', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let score = 0;
let correctas = 0;
let incorrectas = 0;

function startGame() {
  score = 0;
  correctas = 0;
  incorrectas = 0;
  showRandomLetter();
  document.addEventListener('keydown', handleKeyDown);
}

function showRandomLetter() {
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  const randomLetter = alphabet[randomIndex];
  letterDisplay.textContent = randomLetter;
}

function showSelectedLetter(selectedLetter) {
  Swal.fire({
    position: 'top-start',
    text: `Has seleccionado la letra: ${selectedLetter}`,
    showConfirmButton: false,
    timer: 3000,
  });
}

function updateScore() {
  correctasElement.textContent = `Correctas: ${correctas}`;
  incorrectasElement.textContent = `Incorrectas: ${incorrectas}`;
}

function checkAnswer(selectedLetter) {
  showSelectedLetter(selectedLetter);

  if (selectedLetter === letterDisplay.textContent) {
    score++;
    correctas++;
    Swal.fire({
      position: 'top-start',
      text: `¡Correcto! Puntuación: ${score}`,
      showConfirmButton: false,
      timer: 3000,
    });
    setTimeout(() => {
      playAudio('muybien');
    }, 2500);
  } else {
    incorrectas++;
    Swal.fire({
      position: 'top-start',
      text: 'Incorrecto. Inténtalo de nuevo.',
      showConfirmButton: false,
      timer: 3000,
    });
    setTimeout(() => {
      playAudio('incorrecta');
    }, 2000);
  }

  updateScore();
  showRandomLetter();
}

function handleKeyDown(event) {
  const keyPressed = event.key.toUpperCase();
  if (alphabet.includes(keyPressed)) {
    checkAnswer(keyPressed);
    playAudio(keyPressed.toLowerCase());
  }
}

function playAudio(filename) {
  const audio = new Audio(`audio/${filename}.mp3`);
  audio.play();
}

window.onload = startGame;
