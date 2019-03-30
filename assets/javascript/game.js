
// Thank you for preordering Wheel of Fortune** !!!!!
// ** Denotes beta

// Here are the Special Features!:
// -Handles phrases not just single words
// -Game understands if letter has already been selected
// -Only accepts alphanumeric characters
// -Handles upper and lower case condition of each letter
// -Each task is broken down into separate functions with very clear names
// -We're tried to make the job of the TA easier

var gameInProgress = false;
var dashedWord = "";
var newDashedWord = "";
var remainingGuesses = 10;
var phraseToGuess = "";
var alreadyGuessedLetters = "";
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var gamesWon = 0;
var gamesLost = 0;
document.getElementById("newGame").style.visibility = "hidden";
var newPuzzle = new Audio("assets/sounds/Puzzle Reveal.mp3");
var solvePuzzle = new Audio("assets/sounds/Puzzle Solve.mp3");
var failPuzzle = new Audio("assets/sounds/Puzzle Fail.mp3");
var phrases = ["Have it your way",
    "See if I care",
    "Not everyone is a winner",
    "Mistakes happen",
    "Second place is first loser",
    "A fool and his money are soon parted",
    "Close but no ciger",
    "Do not count your chickens before they hatch",
    "Everything but the kitchen sink",
    "Short end of the stick"]

document.onkeydown = function (event) {
    var userEntry = event.key;
    if ((userEntry == " ") && (gameInProgress == false)) {
        document.getElementById("blink").style.display = "none";
        initializeGame();
    } else if (gameInProgress == true) {
        if (remainingGuesses > 0) {
            gamePlay(userEntry, phraseToGuess);
        } else {
            gameFail()
        }
    }
}

function initializeGame() {
    gameInProgress = true;
    document.getElementById("blink").style.display = "none";
    document.getElementById("phraseToGuessTitle").innerHTML = "Phrase To Guess:";
    document.getElementById("guessedLettersTitle").innerHTML = "Guessed Letters:";
    document.getElementById("remainingGuessesTitle").innerHTML = "Remaining Guesses:";
    document.getElementById("remainingGuesses").innerHTML = remainingGuesses;
    document.getElementById("gamesWonTitle").innerHTML = "Games Won: ";
    document.getElementById("gamesLostTitle").innerHTML = "Games Lost: ";
    document.getElementById("gamesWon").innerHTML = gamesWon;
    document.getElementById("gamesLost").innerHTML = gamesLost;
    gameStart();
}

function gameStart() {
    remainingGuesses = 10;
    document.getElementById("newGame").style.visibility = "hidden";
    document.getElementById("guessedLetters").innerHTML = "";
    newPuzzle.play();
    phraseToGuess = "";
    alreadyGuessedLetters = "";
    dashedWord = "";
    console.log("Start new game!");
    phraseSelector();
    gamePlay();
}

function phraseSelector() {
    phraseToGuess = phrases[Math.floor(Math.random() * phrases.length)];
    console.log(phraseToGuess)
    addDashes(phraseToGuess);
}

function addDashes(phraseToGuess) {
    for (i = 0; i < phraseToGuess.length; i++) {
        if (phraseToGuess.charAt(i) == " ") {
            dashedWord += " "
        } else {
            dashedWord += "_"
        }
    }
    newDashedWord = dashedWord;
    document.getElementById("phraseToGuess").innerHTML = dashedWord;
}

function gamePlay(userEntry, phraseToGuess) {
    if ((!alreadyGuessedLetters.includes(userEntry)) && (newDashedWord != phraseToGuess) && (alphabet.includes(userEntry))) {
        alreadyGuessedLetters += (" " + userEntry);
        document.getElementById("guessedLetters").innerHTML = alreadyGuessedLetters;
        phraseToGuessAllLowerCase = phraseToGuess.toLowerCase();
        if (phraseToGuessAllLowerCase.includes(userEntry)) {
            for (i = 0; i < phraseToGuess.length; i++) {
                if ((phraseToGuess.charAt(i) == userEntry.toLowerCase()) || (phraseToGuess.charAt(i) == userEntry.toUpperCase())) {
                    subString1 = newDashedWord.substring(0, i);
                    subString2 = newDashedWord.substring(i + 1, phraseToGuess.length);
                    fillLetter = phraseToGuess.charAt(i);
                    newDashedWord = subString1 + fillLetter + subString2;
                    document.getElementById("phraseToGuess").innerHTML = newDashedWord;
                }
            }
        } else {
            console.log("word dosen't include letter")
            remainingGuesses = remainingGuesses - 1;
            document.getElementById("remainingGuesses").innerHTML = remainingGuesses;
        }
    }
    if ((newDashedWord == phraseToGuess) && (userEntry != " ")) {
        gameWin();
    }
}

function gameWin() {
    solvePuzzle.play();
    gamesWon++;
    document.getElementById("gamesWon").innerHTML = gamesWon;
    document.getElementById("newGame").style.visibility = "visible";
    alert("You Win!")
}

function gameFail() {
    failPuzzle.play();
    gamesLost++;
    document.getElementById("gamesLost").innerHTML = gamesLost;
    document.getElementById("newGame").style.visibility = "visible";
    alert("You Fail")
}
