/*
* Don't drop the spindle!
* Silly 'Hang Man' style game with a sheepish spinning theme
*/

const alphabetArr = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const words = ['twist', 'carders', 'Cochineal', 'fleece', 'kemp', 'alpaca', 'sheep', 'mohair', 'cashmere', 'llama', 'combs', 'thel', 'tog', 'batts', 'roving', 'braid', 'wool', 'angora', 'camel', 'spindle', 'glindle', 'Wensleydale', 'Karakul', 'Laceweight', 'Lanolin', 'Woolen', 'Worsted', 'Rambouillet', 'Flicks', 'Diz', 'Handspun', 'Balanced', 'Cotted', 'Fulling', 'yolk', 'Skirting', 'Drumcarder', ];
const allowedWrongGuesses = 8;
let wrongGuesses = 0;
let word;
let gameOver = false;

function letterClick(letter) {
    if (gameOver) return;

    //disable letter button
    const button = document.getElementById(letter + '-button');
    if (!button) return;
    button.disabled = true;

    checkForLetter(letter);
}

function checkForLetter(letter) {
    let correctGuess = false;
    for (let i = 0; i<word.length;i++) {
        if (word[i].toString().toUpperCase() == letter.toString().toUpperCase()) {
            var wordParentNode = document.getElementById('letters');
            var letterNode = wordParentNode.children[i];
            letterNode.classList.remove('secret');
            letterNode.innerText = letter.toString().toUpperCase();
            correctGuess = true;
        }
    }
    
    if (!correctGuess) userGuessedWrong();

    checkForEndGame();
}

function userGuessedWrong(){
    wrongGuesses++;

    // lower the sprindle
    var spindle = document.getElementById('img-spindle');
    spindle.classList.add('lower' + spindle.classList.length);

    // change the sheep image
    var sheep = document.getElementById('img-sheep');
    switch(wrongGuesses){
        case 2:
        sheep.classList.add('sheep2');
            break;
        case 4:
            sheep.classList.add('sheep3');
            break;
        case 6:
            sheep.classList.add('sheep4');
            break;                
        case 8:
            sheep.classList.add('sheep5');
            spindle.style.display = 'none';
            break;
    }
}

function checkForEndGame() {

    // checking for any letters who still have the .secret class on them
    if (document.getElementsByClassName('secret').length < 1) {
        // player wins!
        endGame(true);
    }            
    else if (wrongGuesses >= allowedWrongGuesses) {
        // player runs out of guesses and looses
        endGame(false);
    }
}

function endGame(didWin) {
    gameOver = true;

    var node = document.getElementById('output-message');

    if (didWin) {
        node && (node.innerText = 'Congrats, you guessed it!');
    }
    else {
        node && (node.innerText = 'You dropped the spindle!');

        // reveal the missing letters
        var wordParentNode = document.getElementById('letters');
        for (let i=0;i<word.length;i++) {
            let letterNode = wordParentNode.children[i];
            if (letterNode) {
                letterNode.innerText = word[i].toString().toUpperCase();
            }
        }
    }

    // show 'play again' button if there are still works in the queue
    if (words.length) {                
        document.getElementById('btn-play-again').style.display = '';
    }
}

function createAlphabetButtons() {
    var node = document.getElementById('alphabet');
    
    // removes all children
    node.innerHTML= "";

    // add buttons
    for (let i = 0; i < alphabetArr.length; i++){
        var btn = document.createElement('button');
        btn.innerText = alphabetArr[i];
        btn.id = alphabetArr[i] + '-button'; 
        btn.onclick = function() {letterClick(alphabetArr[i]);}
        node.appendChild(btn);
    }
}

function drawGuessLetters(nextWord) {
    word = nextWord;
    var node = document.getElementById('letters');

    // removes all children
    node.innerHTML = "";

    for (let i = 0; i < word.length; i++){
        var square = document.createElement("span");
        square.className = 'letter secret';
        node.appendChild(square);
    }
}

function preloadImage(url)
{
    (new Image()).src = url;
}

function reset(){
    gameOver = false;
    wrongGuesses = 0;

    document.getElementById('btn-play-again').style.display = 'none';
    document.getElementById('output-message').innerText = '';            

    document.getElementById('img-spindle').style.display = '';
    document.getElementById('img-spindle').classList.remove('lower1');
    document.getElementById('img-spindle').classList.remove('lower2');
    document.getElementById('img-spindle').classList.remove('lower3');
    document.getElementById('img-spindle').classList.remove('lower4');
    document.getElementById('img-spindle').classList.remove('lower5');
    document.getElementById('img-spindle').classList.remove('lower6');
    document.getElementById('img-spindle').classList.remove('lower7');

    document.getElementById('img-sheep').classList.remove('sheep2');
    document.getElementById('img-sheep').classList.remove('sheep3');
    document.getElementById('img-sheep').classList.remove('sheep4');
    document.getElementById('img-sheep').classList.remove('sheep5');
}

function startGame() {
    reset();

    createAlphabetButtons();

    var randomIndex = Math.random() * words.length;            
    drawGuessLetters(words.splice(randomIndex, 1)[0]);
}