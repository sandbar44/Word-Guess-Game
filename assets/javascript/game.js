// WORD GUESS GAME

// VARIABLES
// ==========================================================================

// Game word list
var wordList = [
    { name: "bridezilla", image: "bridezilla.jpg", quote: "MY DAY MUST BE PERFECT!" },
    { name: "tuxedo", image: "tuxedo.png", quote: "Lookin' sharp!" },
    { name: "church", image: "church.jpg", quote: "Do you hear the bells ringing?" },
    { name: "reception", image: "reception.jpg", quote: "Open bar, anyone?" },
    { name: "engagement", image: "engagement.jpg", quote: "Did she say yes?" },
    { name: "ring", image: "ring.png", quote: "Three years salary, right?" },
    { name: "flowers", image: "flowers.jpg", quote: "Must have decor!" },
    { name: "bridesmaids", image: "bridesmaids.png", quote: "Besties for her." },
    { name: "groomsmen", image: "groomsmen.jpg", quote: "Besties for him." }
]

// Grab all dynamic text divs on the page.
var winsDiv = document.getElementById("wins")
var gameDiv = document.getElementById("game");
var guessCountDiv = document.getElementById("guessCount");
var lettersDiv = document.getElementById("letters");
var imagesDiv = document.getElementById("images");
var quotesDiv = document.getElementById("quotes");

// Remaining guesses
var remainingGuess = 13;

// Guessed letters
var guessedLetters = [];

// Win tracker
var winTracker = 0;

// Word tracker
var wordTracker = [];

// Win song
var winSong;

// DID NOT END UP NEEDING THIS CODE
// Create a text node to hold guessed letters.
// var guessedLetters = document.createTextNode("");
// Assign the the text of this node to be the guessed letter.
// guessedLetters.textContent = userGuess;

// FUNCTIONS
// ==============================================================================

// This function determines which word to use for each round.
function chooseWord() {
    // If all words have been played, then reset wordTracker 
    if (wordTracker.length === wordList.length) {
        wordTracker = [];
    }
    // Otherwise, if word is duplicated, then find a new word
    else {
        chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
        var duplicateWord = wordTracker.indexOf(chosenWord.name);
        for (; duplicateWord !== -1;) {
            chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
            duplicateWord = wordTracker.indexOf(chosenWord.name);
        }
    }
    console.log(chosenWord.name);
    // Create an array and use a for loop to iterate through all the letters in chosen word.
    wordArray = Array.from(chosenWord.name);
    for (var i = 0; i < chosenWord.name.length; i++) {
        wordArray[i] = "_";
    }
    // Add to game div on the page ("#game").
    gameDiv.innerText = wordArray.join(" ");
    // Update image to match word
    imagesDiv.innerHTML = "<img src='assets/images/" + chosenWord.image + "' class='img-fluid'>";
    // Update quote to match word
    quotesDiv.innerHTML = chosenWord.quote;
}

// This function resets each round.
function resetRound() {
    // Update picture
    // Display/update fun quote above
    // Add played word to wordTracker array to prevent repeat words
    wordTracker.push(chosenWord.name);
    console.log(wordTracker);
    // Reset remaining guesses
    remainingGuess = 13;
    guessCountDiv.innerText = remainingGuess;
    // Reset guessed letters
    guessedLetters = [];
    lettersDiv.innerText = guessedLetters;
    // Reset word array
    wordArray = [];
    // Choose new word
    chooseWord();
}

// This function executes win events
function win() {
    winTracker++;
    winsDiv.innerText = winTracker;
    winSong = new sound("assets/sounds/HereComesTheBrideChimes.mp3");
    winSong.play();
}

// Sound function
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}

// This function executes lose events
function lose() {
    alert("Sorry, you lose this round! Try a new word.");
}

// This function is run whenever the user presses a key.
document.onkeyup = function (event) {
    // Determines which key was pressed.
    var userGuess = event.key.toLowerCase()
    // Determines if key press is a letter.
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        // Searches for user's guess in chosen word.
        var userGuessIndex = chosenWord.name.search(userGuess);
        // Determines if userGuess is a duplicate guess.
        var duplicateGuess = guessedLetters.indexOf(userGuess, 0);
        // If incorrect and not a duplicate guess, decrease guess tracker and update guessed letters.
        if (userGuessIndex === -1 && duplicateGuess === -1) {
            remainingGuess--;
            guessCountDiv.innerText = remainingGuess;
            guessedLetters.push(userGuess);
            lettersDiv.innerText = guessedLetters.join(', ');
        }
        // If correct, cycle through each letter and update answer
        else {
            for (var k = 0; k < chosenWord.name.length; k++) {
                if (chosenWord.name[k] === userGuess) {
                    wordArray[k] = userGuess;
                    gameDiv.innerText = wordArray.join(' ');
                }
            }
        }
    }
    // If key press is not a letter, do nothing.
    else { };
    // Determine if any end of round events are triggered
    // Win condition: Word is guessed
    if (chosenWord.name === wordArray.join('')) {
        win();
        resetRound();
    }
    // Lose condition: Remaining guesses = 0
    else if (remainingGuess === 0) {
        lose();
        resetRound();
    };
}
// FUNCTION EXECUTION
// ================================================================================

chooseWord();