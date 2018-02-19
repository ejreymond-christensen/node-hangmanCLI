//Letter constructor
var Letter = function(character, guessed) {
  this.character = character; //guessed letter
  this.guessed = guessed; //true or false
  //returns the letter value, dependent on boolean
  this.guessReturn = function() {
    if (this.guessed === true) {
      return (this.character + " ");
    } else {
      return ("_ ");
    }
  };
  //checks to see if letter has been guess and sets boolean
  this.guessCheck = function(guessedLetter) {
    if (this.character === guessedLetter) {
      this.guessed = true;
    }
  };
};

module.exports = Letter;
