// store recommended elements in variables
const keyboard = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const overlay = document.querySelector('#overlay');
const startButton = document.querySelector('.btn__reset');
let chars = [];
const tries = document.getElementsByClassName('tries');

// missed variable
let missed = 0;

// create array of random phrases (songTitles)

const phrases = [
    'New York New York',
    'Lets Face The Music and Dance',
    'Suspicious Minds',
    'Puff the Magic Dragon',
    'Riders on the Storm',
    'Peter and the Wolf',
    'La La La',
    'Bang Bang',
    'These Boots Are Made for Walking',
    'Strange Fruit',
    'Thunder Road',
    'If I Fell',
    'Rock the Casbah',
    'Purple Rain',
    'Ode to Joy'
];

// add event listener to startButton

startButton.addEventListener('click', () => {
   overlay.style.display = 'none'; 
 });

// Return random phrase from songTitles array
function getRandomPhraseAsArray(arr) {
  const randomPhrase = arr[Math.floor(Math.random() * phrases.length)].toUpperCase(); // Bracket notation access the array value.
  const splitPhrase = randomPhrase.toUpperCase();
// Split a string into an array of substrings.
  const chars = randomPhrase.split(""); 
  return chars;
}
chars = getRandomPhraseAsArray(phrases);

// add characters to Ul as list items
const ul = phrase.querySelector('ul');

function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i++) {
    const li = document.createElement('li');
    li.textContent = arr[i];
    if(arr[i] === " ") {
        li.classList.add('space');
    } else {
        li.classList.add('letter');
    }
        ul.appendChild(li);
  }
}
addPhraseToDisplay(chars);

// Check if chosen letter is in the random phrase
const letters = document.getElementsByClassName('letter');
const show = document.getElementsByClassName('show');
let match = 0;

function checkLetter(letter) {
    for (let i = 0; i < letters.length; i++) {
        if (letters[i].textContent === letter) {
            letters[i].classList.add('show');
            match++;
        }
    }
    if (match > 0) {
        match = 0;
        return letter;
    }
}

// Check and see if the number of letters with class "show" equals to the 
// number of letters with class "letters"

const checkWin = () => {
  const letter = document.querySelectorAll("#phrase .letter");
  const show = document.querySelectorAll("#phrase .show");
  const title = document.querySelector(".title");
// Compare the length
  if (letter.length === show.length) {
    //change class name
    overlay.classList.replace("start", "win"); 
    title.innerHTML = `Victory is yours! <br>Two out of Three, C'mon?`;
    overlay.style.display = "flex";
    startButton.textContent = "Play Again";
  } else if (missed > 4) {
    //change class name
    overlay.classList.replace("start", "lose");
    title.innerHTML = `Bummer! <br>Another round? Your luck's about to change!`;
    overlay.style.display = "flex";
    startButton.textContent = "Try Again";
  }
};
// Listen for keyboard clicks from user
// const tries = document.getElementsByClassName('tries');

qwerty.addEventListener('click', (event) => {
    if (event.target.tagName == 'BUTTON') {
        const button = event.target;
        const guess = button.textContent.toUpperCase();
        const letterFound = checkLetter(guess);
        if (!letterFound) {
            missed += 1;
            tries[missed - 1].style.display = 'none';
        }
        button.classList.add('chosen');
        button.disabled = true;
    }
    checkWin(event);
});

// Resets the game 
function restartGame() {
  let button = qwerty.getElementsByTagName('button');
  for (let i = 0; i < button.length; i++) {
      button[i].removeAttribute('class');
      button[i].removeAttribute('disabled');
  }
  missed = 0;
  for (let i = 0; i < 5; i++) {
      tries[i].firstChild.src = 'images/liveHeart.png';
  }
  overlay.style.display = 'none';
  ul.innerHTML = '';
  const newPhraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(newPhraseArray);
}
//Starts the game and removes the overlay
overlay.addEventListener('click', (e) => {
  if (event.target.tagName === 'A') {
      if (overlay.className === 'start') {
          overlay.style.display = 'none';
      } else if (overlay.className === 'win' || overlay.className === 'lose') {
          restartGame();
      }
  }
});






