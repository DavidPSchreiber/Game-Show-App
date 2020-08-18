// store recommended elements in variables
const keyboard = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const overlay = document.querySelector('#overlay');
const startButton = document.querySelector('.btn__reset');
let missed = 0;
const phraseUl = document.querySelector('#phrase ul');
const li = document.createElement('li');
const ul = document.querySelector('ul');
const heartList = document.querySelector('#scoreboard ol');
const heartArray = document.querySelectorAll('.tries img');

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


startButton.addEventListener('click', () => {
	if (startButton.textContent === 'Start Game') {
		startGame();
		overlay.style.display = 'none';	
	} else {
		resetGame();
		startGame();
		overlay.style.display = 'none';
	}
});

function getRandomPhraseAsArray(arr) {
	// choose random phrase from arr
	const randomNumber = Math.floor(Math.random() * arr.length);
	const randomPhrase = arr[randomNumber];
	// split that string into new array of characters
	const characters = randomPhrase.split('');
	// return the new array of characters
	return characters;
}


// Gets an array of letters and creates list elements to put them in

function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        li.textContent = arr[i];
        ul.appendChild(li);
        if (li.textContent !== ' ') {
            li.className = 'letter';
        } else {
            li.className = 'space';
        }
    }
}

keyboard.addEventListener('click', (e) => {
	if (e.target.tagName === 'BUTTON') {
		const button = e.target;
		button.className = 'chosen';
		button.setAttribute('disabled', '');
		const letter = button.textContent;
		const letterFound = checkLetter(letter);

		// check value of letterFound variable
		if (letterFound === null) {
			heartArray[missed].src = 'images/lostHeart.png';
			button.className = 'wrong';
			missed++;
		}
	}

	// check for winner
	checkWin();

});

function checkLetter(letter) {
	// get all of the elements with class "letter"
	const letters = document.querySelectorAll('.letter');
	let matchingLetter;
	let matchCounter = 0;

	// loop over these elements to see if they match letter chosen
	for (let i = 0; i < letters.length; i++) {
		// if there's a match
		if (letter === letters[i].textContent) {
			// add class "show" to the list item containing that letter
			letters[i].className += ' show';
			// store the matching letter inside a variable
			matchingLetter = letter;
			matchCounter++;
		} 
	}
	
	if (matchCounter > 0) {
		return matchingLetter;
	} else {
		return null;
	}
}

function checkWin() {
	const totalLetters = document.querySelectorAll('.letter');
	const shownLetters = document.querySelectorAll('.show');
	const h3 = document.createElement('h3');

	// 	if # of letters with class "show" equals # letters with class "letter"
	if (shownLetters.length === totalLetters.length) {
		// show overlay screen with class "win" and text
		removeShowClass();
		overlay.className = 'win';
		overlay.style.display = 'flex';
		startButton.textContent = 'Play Again';
		overlay.appendChild(h3);
		h3.textContent = 'Victory is yours!  Two out of three?';
		showCorrectPhrase();
	} else if (missed > 4) { 
		// show overlay screen with class "lose" and text
		removeShowClass();
		overlay.className = 'lose';
		overlay.style.display = 'flex';
		startButton.textContent = 'Try Again?';
		overlay.appendChild(h3);
		h3.textContent = `Bummer! Another round?  Your luck's about to change!`;
		showCorrectPhrase();
	}		
}

function removeShowClass() {
	for (let i = 0; i < phraseUl.children.length; i++) {
		phraseUl.children[i].classList.remove('show');
	}
}

function showCorrectPhrase() {
	const h4 = document.createElement('h4');
	h4.textContent = `Correct Answer:<br>'phraseUl.textContent.toUpperCase();
	overlay.appendChild(h4);
}

function startGame() {
	const phraseArray = getRandomPhraseAsArray(phrases);
	addPhraseToDisplay(phraseArray);
}

function resetGame() {
	// reset missed counter
	missed = 0;

	// remove previous phrase from board
	while (phraseUl.firstChild) {
		phraseUl.removeChild(phraseUl.firstChild);
	}

	// remove win/lose message
	const h3 = document.querySelector('h3');
	h3.parentNode.removeChild(h3);

	// remove correct phrase
	const h4 = document.querySelector('h4');
	h4.parentNode.removeChild(h4);

	// reset hearts
	for (let i = 0; i < heartArray.length; i++) {
		heartArray[i].src = 'images/liveHeart.png';
	}

	// reset keyboard classes and attributes
	const keyboardButton = document.querySelectorAll('#qwerty button');
	for (let i = 0; i < keyboardButton.length; i++) {
		keyboardButton[i].classList.remove('chosen');
		keyboardButton[i].classList.remove('wrong');
		keyboardButton[i].removeAttribute('disabled');
	}
}