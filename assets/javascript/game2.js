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

  // Declare health, attack and counterattack points
  var char1HP, char2HP, char3HP, char4HP;
  var char1AP, char2AP, char3AP, char4AP; 
  var char1CAP, char2CAP, char3CAP, char4CAP;


  // FUNCTIONS
  // =========


  // Update dispaly function
  function displayUpdate() {
    $("#han-name").text(char1.name);
    $("#han-hp").text(char1HP);
    $("#yoda-name").text(char2.name);
    $("#yoda-hp").text(char2HP);
    $("#palpatine-name").text(char3.name);
    $("#palpatine-hp").text(char3HP);
    $("#vader-name").text(char4.name);
    $("#vader-hp").text(char4HP);
  }

  // Restart game function
  function restartGame() {
    char1HP = char1.calcHP();
    char2HP = char2.calcHP();
    char3HP = char3.calcHP();
    char4HP = char4.calcHP();
    char1AP = char1.calcAP();
    char2AP = char2.calcAP();
    char3AP = char3.calcAP();
    char4AP = char4.calcAP();
    // Check attack and counter attack points aren't the same
    char1CAP = char1.calcCAP();
    char2CAP = char2.calcCAP();
    char3CAP = char3.calcCAP();
    char4CAP = char4.calcCAP();

  }

  // MAIN CONTROLLER
  restartGame();
  console.log(char1.name + "-" + char1HP + "-" + char1AP + "-" + char1CAP);
  console.log(char2.name + "-" + char2HP + "-" + char2AP + "-" + char2CAP);
  console.log(char3.name + "-" + char3HP + "-" + char3AP + "-" + char3CAP);
  console.log(char4.name + "-" + char4HP + "-" + char4AP + "-" + char4CAP);

  displayUpdate();



  // Event listener
  $("#attack-btn").on("click", function() {
    console.log($(this).attr("hp"));
  });

});