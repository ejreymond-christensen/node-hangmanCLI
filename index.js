var word = require("./word.js");
var inquirer = require("inquirer");

var lives = 5;
var guessedLetters = [];
var game = "";

var wordBank = ["nantes france", "brussels belgium", "monaco monaco", "quebec canada", "bern switzerland"];


var gameStart = function() {
  guessedLetters = [];
  randomWord = wordBank[Math.floor(Math.random()*wordBank.length)];
  game = new word.word(randomWord);
  console.log(" ---- New Word ---- ");
  game.returnWord();
  turn();
};

var turn = function() {
  inquirer.prompt({type: "input", message: "Guess a letter!", name: "guess"}).then(function(response) {
    if (word.alphabet.indexOf(response.guess.toLowerCase()) === -1) {
      console.log("Please chose a proper letter");
      turn();
    }else{
    if (guessedLetters.indexOf(response.guess.toLowerCase()) === -1) {
      if (game.letters.indexOf(response.guess.toLowerCase()) === -1) {
        lives = lives - 1;
        guessedLetters.push(response.guess.toLowerCase());
        console.log("Sorry, that letter is not in the word");
        console.log("Current lives:" + lives);
        if (lives >0) {
          game.returnWord();
          turn();
        }else{
          console.log("You Loose!");
          restart();
        }
      } else {
        guessedLetters.push(response.guess.toLowerCase());
        game.guess(response.guess.toLowerCase());
        game.returnWord();
        if (game.currentIteration.indexOf("_ ") === -1) {
          console.log("You win!");
          gameStart();
        }else{
          turn();
        }
      }
    } else {
      console.log("Sorry, but that letter has already been played");
      game.returnWord();
      turn();
    }
  }
});
};

var restart = function(){
  inquirer.prompt({type: "confirm", message: "Would you like to play again?", name: "confirm", default: true}).then(function(response){
    if (response.confirm === true) {
      lives = 5;
      gameStart();
    }else{
      console.log("See you next time!");
    }
  });
};

gameStart();
