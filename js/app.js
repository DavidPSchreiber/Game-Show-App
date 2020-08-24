const phrase = document.getElementById('phrase');
const qwerty = document.getElementById('qwerty');
let missed = 0;

const ul = phrase.querySelector('ul');
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


const startButton = document.querySelector('.btn__reset');
const startScreen = document.getElementById('overlay');
let h1 = startScreen.querySelector('h1');
const title = document.querySelector('.title');

// Choose random phrase
function getRandomPhraseArray(array) {
  let index = Math.floor(Math.random() * phrases.length);
  let phrase = array[index].toUpperCase();
  let letters = phrase.split("");
  return letters;
}

// Split phrase into letters and create list items for each letter
function addPhraseToDisplay(array) {
  let letters = getRandomPhraseArray(array);
  for (let i = 0; i < letters.length; i++) {
    let letter = letters[i];
    let li = document.createElement('li');
    li.className = "letter";
    li.textContent = letter;
    if (li.textContent === " ") {
      li.className = "space";
    }
    ul.appendChild(li);
  }
  return letters;
}

// reset phrase section
function resetPhrase() {
  let phraseUl = document.querySelector('ul');
  phraseUl.innerHTML = "";
}

// reset keyboard
function resetKeyboard() {
  let qwertyKeys = document.querySelectorAll('.chosen');
  for (let i = 0; i < qwertyKeys.length; i++) {
    qwertyKeys[i].removeAttribute('disabled');
    qwertyKeys[i].classList.remove('chosen');
  }
}

// reset lives
function resetHearts() {
  let ol = document.querySelector('ol');
  let lives = ol.querySelectorAll('img');
  for (let i = 0; i < lives.length; i++) {
    lives[i].setAttribute('src', 'images/liveHeart.png');
  }
}

// reset game
function clearGame() {
  missed = 0;
  resetPhrase();
  resetKeyboard();
  resetHearts();
}

function checkLetter(clicked, array) {
  let letter = null;
  for (let i = 0; i < array.length; i++) {
    if (clicked.textContent === array[i].textContent.toLowerCase()) {
      letter = array[i].textContent.toLowerCase();
      array[i].classList.add("show");

    }
    clicked.classList.add("chosen");
    clicked.setAttribute("disabled", true);
  }
  return letter;
    
}

// check keyboard input against letters in phrase
qwerty.addEventListener('click', (e) => {
  let letterFound;
  if (e.target.tagName === "BUTTON") {
    let clicked = e.target;
    let lis = ul.children;
    let letters = [];
//      rollSound="cardTurning.play()";
    for (let i = 0; i < lis.length; i++) {
      if (lis[i].className === "letter") {
        letters.push(lis[i]);
      }
    }

    letterFound = checkLetter(clicked, letters);

    if (letterFound === null) {
      let ol = document.querySelector('ol');
      let lives = ol.getElementsByTagName('img');
      lives[missed].setAttribute('src', 'images/lostHeart.png');
      missed++;
    } else {
        var myAudio = new Audio('file:///Users/davidschreiber/Desktop/Coding%20Projects/TechnicalDegree-Project-6/audio/cardTurning-1.mp3');
        myAudio.playbackRate = 2.8;
        myAudio.play();
        
    }
  }
  checkWin(); 
});

function checkWin() {
  let show = document.getElementsByClassName('show');
  let letters = document.getElementsByClassName('letter');
  startButton.textContent = "New Game";
  if (show.length === letters.length) {
    h1.innerHTML = '';
    title.textContent = "Victory is yours! Two out of three?";
    startScreen.className = 'win';
    setTimeout(() => {
      startScreen.style.display = "flex";
      clearGame();
  }, 2500);

  } else if (missed > 4) {
    let fullPhrase = [];
    const phraseChars = document.querySelectorAll('#phrase ul li');
    phraseChars.forEach(char => fullPhrase.push(char.textContent));
    h1.innerHTML = `The song was: ${fullPhrase.join('')}`; 
    clearGame();
    startScreen.className = 'lose';
    startScreen.style.display = "flex";
    title.textContent = "Bummer! How 'bout another round?";
  }
}
// Start play
startButton.addEventListener('click', (e) => {
  addPhraseToDisplay(phrases);
  startScreen.style.display = "none";
});
