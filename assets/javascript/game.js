
var gameInProgress = false;
var dashedWord = "";
var newDashedWord = "";
var numberOfGuess = 0;
var wordToGuess = "";
var alreadyGuessedLetters = "";

document.onkeydown = function (event) {
    var userEntry = event.key;
    if ((userEntry == " ") && (gameInProgress == false)) {
        start();
    } else if (gameInProgress == true) {
        gamePlay(userEntry, wordToGuess);
    }
}

function start() {
    console.log("start");
    document.getElementById("blink").style.display = "none";
    document.getElementById("wordToGuessTitle").innerHTML = "Word To Guess:";
    game();
    gameInProgress = true;
}

function game() {
    //var neighborhoods = ["Lincoln Park", "Old Town", "River North"]
    var neighborhoods = ["Lincoln Park", "Old Town", "River North"]
    wordToGuess = neighborhoods[Math.floor(Math.random() * neighborhoods.length)];
    console.log(wordToGuess)
    addDashes(wordToGuess);
    document.getElementById("guessedLettersTitle").innerHTML = "Guessed Letters:";
}

function addDashes(wordToGuess) {
    for (i = 0; i < wordToGuess.length; i++) {
        if (wordToGuess.charAt(i) == " ") {
            dashedWord += " "
        } else {
            dashedWord += "-"
        }
        newDashedWord=dashedWord;
    }
    document.getElementById("wordToGuess").innerHTML = dashedWord;
}

function gamePlay(userEntry, wordToGuess) {
    if (!alreadyGuessedLetters.includes(userEntry)) {
        numberOfGuess++;
        alreadyGuessedLetters += (" " + userEntry);
        document.getElementById("guessedLetters").innerHTML = alreadyGuessedLetters;
        wordToGuessAllLowerCase = wordToGuess.toLowerCase();
        if (wordToGuessAllLowerCase.includes(userEntry)) {
            for (i = 0; i < wordToGuess.length; i++) {
                if (wordToGuess.charAt(i) == userEntry.toLowerCase() || wordToGuess.charAt(i) == userEntry.toUpperCase()) {
                    subString1 = newDashedWord.substring(0,i);
                    subString2 = newDashedWord.substring(i+1,wordToGuess.length);
                    fillLetter = wordToGuess.charAt(i);
                    newDashedWord = subString1 + fillLetter + subString2;
                    document.getElementById("wordToGuess").innerHTML = newDashedWord;
                }
            }
            if(newDashedWord==wordToGuess){
                alert("You win!")
            }
        } else {
            console.log("word dosen't include letter")
        }
    }
}

//TODO:
//shoe guessed word with proper case
//Repeat Game
//Wins/Losses
//Alert you win in correct position
//add button to restart game