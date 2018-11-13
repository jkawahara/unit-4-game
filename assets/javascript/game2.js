$(document).ready(function() {

  // GLOBAL VARIABLES
  // =========
  
  // Character constructor: name, health, attack and counter attack points 
  function Character(name) {
    this.name = name;
  }
  Character.prototype.calcHP = function() {
    var healthPoints = Math.ceil(Math.random() * 100) + 100; // Health points 101-200
    return healthPoints;
  };
  Character.prototype.calcAP = function() {
    var attackPoints = Math.ceil(Math.random() * 25); // Attack points 1-25
    return attackPoints;
  };
  Character.prototype.calcCAP = function() {
    var counterAttackPoints = Math.ceil(Math.random() * 25); // Counter attack points 1-25
    return counterAttackPoints;
  };

  // Generate character objects using Character constructor
  var char1 = new Character("Han Solo");
  var char2 = new Character("Yoda");
  var char3 = new Character("Emperor Palpatine");
  var char4 = new Character("Darth Vader");
  var char1HP = char1.calcHP();
  var char2HP = char2.calcHP();
  var char3HP = char3.calcHP();
  var char4HP = char4.calcHP();
  var char1AP = char1.calcAP();
  var char2AP = char2.calcAP();
  var char3AP = char3.calcAP();
  var char4AP = char4.calcAP();
  // Check attack and counter attack points aren't the same
  var char1CAP = char1.calcCAP();
  var char2CAP = char2.calcCAP();
  var char3CAP = char3.calcCAP();
  var char4CAP = char4.calcCAP();
  console.log(char1.name + "-" + char1HP + "-" + char1AP + "-" + char1CAP);
  console.log(char2.name + "-" + char2HP + "-" + char2AP + "-" + char2CAP);
  console.log(char3.name + "-" + char3HP + "-" + char3AP + "-" + char3CAP);
  console.log(char4.name + "-" + char4HP + "-" + char4AP + "-" + char4CAP);


  // FUNCTIONS
  // =========


  // Update dispaly function
  function displayUpdate() {

  }

  // Restart game function
  function restartGame() {
    
  }

  // MAIN CONTROLLER
  restartGame();

  
  displayUpdate();


  // Event listener
  // $(".btn").on("click", function() {
    
  // });

});