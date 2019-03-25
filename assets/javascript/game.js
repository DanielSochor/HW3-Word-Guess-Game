
document.onkeypress = function (event) {
    var userEntry = event.key;
    console.log(userEntry);

    if (userEntry = " ") {
        console.log("space");
        document.getElementById("blink").style.display = "none";
        game();
    }

}

function game() {
    var neighborhoods = ["Lincoln Park", "Old Town", "River North"]
    var choosen = neighborhoods[Math.floor(Math.random() * neighborhoods.length)];
    console.log(choosen)

    addDashes(choosen);
}

var dashedWord = "";

function addDashes(choosen) {
    for (i = 0; i < choosen.length; i++) {
        if (choosen.charAt(i) == " ") {
            dashedWord += " "
        } else {
            dashedWord += "-"
        }
    }
    document.getElementById("wordToGuess").innerHTML = dashedWord;
}
