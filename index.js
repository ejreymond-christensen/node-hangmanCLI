var word = require("./word.js");
var inquirer = require("inquirer");

//global variables
var lives = 10;
var guessedLetters = [];
var game = "";

//word bank of rugby teams.
var wordBank = [
  "ireland",
  "scotland",
  "japan - cherry blossoms",
  "new zealand - all blacks",
  "south africa - springboks",
  "italy - azzurri",
  "england",
  "france - les bleus",
  "argentina - los pumas",
  "united states - eagles",
  "tonga - sea eagles",
  "australia - wallabies",
  "wales",
  "georgia - lelos",
  "fiji - flying fijians",
  "uruguay - los teros"
];

// function to start the game and pick a new word.
var gameStart = function() {
  guessedLetters = [];
  randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];
  game = new word.word(randomWord);
  console.log(" ---- New Word ---- ");
  game.returnWord();
  turn();
};

// function that runs the game logic.
var turn = function() {
  // prompts user for input.
  inquirer.prompt({type: "input", message: "Guess a letter!", name: "guess"}).then(function(response) {
    //validates if input is a letter in alphabet
    if (word.alphabet.indexOf(response.guess.toLowerCase()) === -1) {
      console.log("Please chose a proper letter");
      turn();
    } else {
      //validates if the letter has already been chosen (stored in the guessedLetters array)
      if (guessedLetters.indexOf(response.guess.toLowerCase()) === -1) {
        //checks if the letter is in the word, if not subtract a life
        if (game.letters.indexOf(response.guess.toLowerCase()) === -1) {
          lives = lives - 1;
          guessedLetters.push(response.guess.toLowerCase());
          console.log("Sorry, that letter is not in the word");
          console.log("Current lives:" + lives);
          //checks how many lives are available, if so next turn
          if (lives > 0) {
            game.returnWord();
            turn();
            // if not, game over
          } else {
            console.log("You Loose!");
            console.log("");
            restart();
          }
          //if guess passed all validation and is in the word, a good guess is logged, updates the word.
        } else {
          guessedLetters.push(response.guess.toLowerCase());
          console.log("Great Guess!");
          game.guess(response.guess.toLowerCase());
          game.returnWord();
          //if the full word has been guessed (ie, no more underscores), game is won.
          if (game.currentIteration.indexOf("_ ") === -1) {
            console.log("You win!");
            console.log("");
            gameStart();
            //if not, keep playing.
          } else {
            turn();
          }
        }
        // if player validation fails first if statement (if the letter has already been played), let the player know, retry.
      } else {
        console.log("Sorry, but that letter has already been played");
        game.returnWord();
        turn();
      }
    }
  });
};

//this function restarts the game, via a prompt asking if the play wants to replay.
var restart = function() {
  inquirer.prompt({type: "confirm", message: "Would you like to play again?", name: "confirm", default: true}).then(function(response) {
    if (response.confirm === true) {
      lives = 10;
      gameStart();
    } else {
      console.log("See you next time!");
    }
  });
};

//this console logs the start screen and starts the game.
console.log("\n---==== RUGBY WORLD CUP HANGMAN 2019====---\n");
gameStart();
