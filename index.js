var word = require("./word.js");
var inquirer = require("inquirer");

var lives = 5;
guessedLetters = [];

var gameStart = function(){
  var game= new word("france");
  console.log(" ---- New Word ---- ");
  game.returnWord();
  inquirer.prompt({
    type: "input",
    message: "Guess a letter!",
    name: "guess"
  }).then(function(response){
    if (guessedLetters.indexOf(response.guess) === -1) {
      guessedLetters.push(response.guess);
      game.guess(response.guess);
    }else{
      console.log("Sorry, but that letter has already been played");
    }
    game.returnWord();
  });
};

gameStart();
