
var gameInProgress = false;
var dashedWord = "";
var newDashedWord = "";
var numberOfGuess = 0;
var wordToGuess = "";
var alreadyGuessedLetters = "";

document.onkeypress = function (event) {
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
    var neighborhoods = ["lincoln park", "old town", "river north"]
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
        console.log("number of guesses:" + numberOfGuess);
        if (wordToGuess.includes(userEntry)) {
            console.log("word includes letter")
            for (i = 0; i < wordToGuess.length; i++) {
                //newDashedWord = dashedWord
                if (wordToGuess.charAt(i) == userEntry) {
                    console.log("position of letter:" + i);
                    subString1 = newDashedWord.substring(0,i);
                    subString2 = newDashedWord.substring(i+1,dashedWord.length);
                    console.log(subString1);
                    console.log(subString2);
                    newDashedWord = subString1 + userEntry + subString2;
                    console.log(newDashedWord);
                    // newDashedWord = dashedWord.replace(dashedWord[i], userEntry);
                    //console.log(newDashedWord[i]); 
                    document.getElementById("wordToGuess").innerHTML = newDashedWord;
                }
            }
        } else {
            console.log("word dosen't include letter")
        }
    }
}

// function replaceStringCharacter (wordToGuess,userEntry){
// part1 = wordToGuess.substring()
// }

//TODO:
//Repeat Game
//Wins/Losses
//Alert you win
