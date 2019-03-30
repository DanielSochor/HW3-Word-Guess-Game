
var gameInProgress = false;
var dashedWord = "";
var newDashedWord = "";
var remainingGuesses = 10;
var phraseToGuess = "";
var alreadyGuessedLetters = "";
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var gamesWon = 0;
var gamesLost = 0;
//var phrases = ["Lincoln Park", "Old Town", "River North"];
var phrases = ["Have it your way","See if I care","Not everyone is a winner","Mistakes happen"]
document.getElementById("newGame").style.visibility = "hidden";
var newPuzzle = new Audio("assets/sounds/Puzzle Reveal.mp3");
var solvePuzzle = new Audio("assets/sounds/Puzzle Solve.mp3");
var failPuzzle = new Audio("assets/sounds/Puzzle Fail.mp3");

document.onkeydown = function (event) {
    var userEntry = event.key;
    if ((userEntry == " ") && (gameInProgress == false)) {
        document.getElementById("blink").style.display = "none";
        initializeGame();
    } else if (gameInProgress == true) {
        gamePlay(userEntry, phraseToGuess);
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
    document.getElementById("newGame").style.visibility = "hidden";
    gameStart();
}

function gameStart() {
    newPuzzle.play();
    document.getElementById("guessedLetters").innerHTML = "";
    phraseToGuess = "";
    alreadyGuessedLetters = "";
    dashedWord = "";
    numberOfGuesses = 0;
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
            dashedWord += "  "
        } else {
            dashedWord += "-"
        }
    }
    newDashedWord = dashedWord;
    document.getElementById("phraseToGuess").innerHTML = dashedWord;
    maximumNumberOfGuesses = Math.max(10, (phraseToGuess.length)*0.5);
    console.log(maximumNumberOfGuesses);
}

function gamePlay(userEntry, phraseToGuess) {
    if ((!alreadyGuessedLetters.includes(userEntry)) && (newDashedWord != phraseToGuess) && (alphabet.includes(userEntry))) {
        //numberOfGuesses ++;
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
            remainingGuesses = remainingGuesses -1;
            document.getElementById("remainingGuesses").innerHTML = remainingGuesses;
        }
    }
    if ((newDashedWord == phraseToGuess) && (userEntry != " ")) {
        solvePuzzle.play();
        alert("You Win!")
        gamesWon ++;
        document.getElementById("gamesWon").innerHTML = gamesWon;
        document.getElementById("newGame").style.visibility = "visible";
    }
    if ((remainingGuesses == 0) && (userEntry != " ")){
        //gameInProgress = false;
        failPuzzle.play();
        alert("You Fail")
        gamesLost ++;
        document.getElementById("gamesLost").innerHTML = gamesLost;
        document.getElementById("newGame").style.visibility = "visible";
    }

}

//TODO:
//fix font
//more phrases
//show answer
//correct answer don't count towards mistakes