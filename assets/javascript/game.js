$(document).ready(function() {

  // GLOBAL VARIABLES
  // =========

  var randomNum; // Number randomly picked from 19-120
  var totalScore; // Player's total score
  var wonLost = ""; // Text for prior game won or last 
  var wins = 0; // Player's total wins
  var losses = 0; // Player's total losses


  // FUNCTIONS
  // =========

  // Update dispaly function
  function displayUpdate() {
    $("#random-num-text").text(randomNum);
    $("#won-lost-text").text(wonLost);
    $("#wins-text").text("Wins " + wins);
    $("#losses-text").text("Losses " + losses);
    $("#total-score-text").text(totalScore);
  }

  // Restart game function
  function restartGame() {
    randomNum = (Math.ceil(Math.random() * 102)) + 18;
    
    // Loop to generate unique random numbers
    var crysPointVal = []; // Array for storing 4 unique random numbers
    while (crysPointVal.length < 4) {
      var randomNumCrys = Math.ceil(Math.random() * 11) + 1; // Number randomly picked from 2-12 (per David's clarification, not skip 1)
      if (crysPointVal.indexOf(randomNumCrys) > -1) {
        continue;
      }
      crysPointVal[crysPointVal.length] = randomNumCrys;
      totalScore = 0;
    }

    // Update crystal's value from unique random numbers array
    $("#crys1").val(crysPointVal[0]);
    $("#crys2").val(crysPointVal[1]);
    $("#crys3").val(crysPointVal[2]);
    $("#crys4").val(crysPointVal[3]);
  }

  // MAIN CONTROLLER
  restartGame();
  displayUpdate();

  // Event listener
  $(".btn").on("click", function() {
    totalScore += parseInt($(this).attr("value"));
    displayUpdate();

    if (totalScore === randomNum) {
      wins++;
      wonLost = "You won!!";
      restartGame();
      displayUpdate();
    } else if (totalScore > randomNum) {
      losses++;
      wonLost = "You lost!!"
      restartGame();
      displayUpdate();
    }
  });

});