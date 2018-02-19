//Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:

//An array of new Letter objects representing the letters of the underlying word

//A function that returns a string representing the word. This should call the function on each letter object (the first function defined in Letter.js) that displays the character or an underscore and concatenate those together.

//A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in Letter.js)
var alphabet =["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "n", "m", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var Letter = require("./letter.js");

var Word = function(currentWord) {
  this.letters = currentWord.split("");
  this.newLettersArray = [];
  this.currentIteration = "";
  console.log(this.letters);
  for (var i = 0; i < this.letters.length; i++) {
    var character= "";
    if (alphabet.indexOf(this.letters[i].toLowerCase()) === -1) {
      character = new Letter(this.letters[i], true);
    }else{
      character = new Letter(this.letters[i], false);
    }
    this.newLettersArray.push(character);
  }
  this.returnWord = function() {
    var displayWord ="";
    for (var i = 0; i < this.newLettersArray.length; i++) {
      displayWord = displayWord + this.newLettersArray[i].guessReturn();
    }
    this.currentIteration = displayWord;
    console.log(displayWord);
  };
  this.guess = function(guessedLetter) {
    for (var i = 0; i < this.newLettersArray.length; i++) {
      this.newLettersArray[i].guessCheck(guessedLetter);
      if (alphabet.indexOf(guessedLetter) === -1) {
        Letter.guessed = true;
      }
    }
  };
};

module.exports = {
	word: Word,
	alphabet: alphabet
};
