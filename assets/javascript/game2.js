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
    var attackPoints = Math.ceil(Math.random() * 20); // Attack points 1-20
    return attackPoints;
  };
  Character.prototype.calcCAP = function() {
    var counterAttackPoints = Math.ceil(Math.random() * 40); // Counter attack points 1-50
    return counterAttackPoints;
  };

  // Generate character objects using Character constructor
  var chars = []; // Declare array for 4 characters
  chars[0] = new Character("Han Solo");
  chars[1] = new Character("Yoda");
  chars[2] = new Character("Emperor Palpatine");
  chars[3] = new Character("Darth Vader");

  // Declare fight variables and flags
  var baseAP;
  var defeatedEnemies = 0;
  var defeatedFlag = false;
  var attackCharIndex = -1; // Declare to -1
  var defendCharIndex = -1; // Declare to -1
  var wonFlag = false;
  

  // FUNCTIONS
  // =========

  // Render start display
  function displayStart() {
    // Position characters in start section
    $(".attacker-section, .enemies-section, .defender-section, .result-section, .restart-section").empty();
    $(".attacker-section").append("<p>Your Character</p>")
    $(".enemies-section").append("<p>Enemies Available to Attack</p>")
    $(".defender-section").append("<p>Defender</p>")
    for (var i = 0; i < chars.length; i++) {
      $(".chars-section").append(`<button class="chars-btns" id="char${i + 1}-btn"></button>`);
      $(`#char${i + 1}-btn`).append(`<p id="char${i + 1}-name">${chars[i].name}</p>`);
      $(`#char${i + 1}-btn`).append(`<p id="char${i + 1}-hp">${chars[i].healthPoints}</p>`);
    }
  }

  // Render attacker and enemies display
  function displayAttacker() {
    $(".attacker-section").append($(`.chars-section > #${$(this).attr("id")}`));
    $(".enemies-section").append($(".chars-section > button"));
    attackCharIndex = parseInt(this.id.charAt(4)) - 1;
    baseAP = chars[attackCharIndex].attackPoints; // Set base attack points for attacker
  }

  // Render defender display
  function displayDefender() {
    // If attacker selected but defender not selected and character button pressed
    if (attackCharIndex > -1 && defendCharIndex === -1) {
      $(".result-section").empty();
      $(".defender-section").append($(`.enemies-section > #${$(this).attr("id")}`));
      defendCharIndex = parseInt(this.id.charAt(4)) - 1;
    }
  }

  // Render no enemy display
  function displayNoEnemy() {
    $(".result-section").empty();
    $(".result-section").append("<p>No enemy here.</p>");
  }

  // Render fight result
  function displayFight() {
    $(".result-section").empty();

    // Attack message and update healthpoints
    $(".result-section").append(`<p>You attacked ${chars[defendCharIndex].name} for ${chars[attackCharIndex].attackPoints} damage.</p>`);
    $(`#char${attackCharIndex + 1}-hp`).text(chars[attackCharIndex].healthPoints); 

    // Counter attack message and update healthpoints
    $(".result-section").append(`<p>${chars[defendCharIndex].name} attacked you back for ${chars[defendCharIndex].counterAttackPoints} damage.</p>`);
    $(`#char${defendCharIndex + 1}-hp`).text(chars[defendCharIndex].healthPoints); 
  }

  // Render defender defeated
  function displayDefenderDefeat() {
    $(".defender-section, .result-section").empty();
    $(".result-section").append(`<p>You have defeated ${chars[defendCharIndex].name}, you can choose to fight another enemy.</p>`);
  }

  // Render attacker defeated
  function displayAttackerDefeated() {
    $(".result-section").empty();
    $(".result-section").append("<p>You have been defeated...GAME OVER!!!</p>");
    $(".restart-section").append("<button id='restart-btn'>Restart</button");    
  }

  // Render attacker wins
  function displayAttackerWins() {
    $(".result-section").empty();
    $(".result-section").append("<p>You Won!!!! GAME OVER!!!</p>");
    $(".restart-section").append("<button id='restart-btn'>Restart</button");
  }

  // Restart game function
  function startGame() {
    // Create character attributes
    for (var i = 0; i < chars.length; i++) {
      chars[i].healthPoints = chars[i].calcHP();
      chars[i].attackPoints = chars[i].calcAP();
      // Check attack and counter attack points aren't the same
      do {
        chars[i].counterAttackPoints = chars[i].calcCAP();
      }
      while (chars[i].attackPoints === chars[i].counterAttackPoints);
    }

    baseAP;
    defeatedEnemies = 0;
    defeatedFlag = false;
    attackCharIndex = -1;
    defendCharIndex = -1;
    wonFlag = false;
  }

  // MAIN CONTROLLER
  startGame();
  displayStart();

  // Listen for button press to select attacker
  $(document).on("click", ".chars-section > button", displayAttacker);
  
  // Listen for button press to select defender
  $(document).on("click", ".enemies-section > button", displayDefender);

  // Listen for attack button press
  $("#attack-btn").on("click", function() {
    // If no enemy selected and press attack button
    if (attackCharIndex === -1 || defendCharIndex === -1) {
      displayNoEnemy();
    
    // If attacker and defender selected then fight and adjust attributes
    } else if (attackCharIndex > -1 && defendCharIndex > -1 && defeatedEnemies < 3 && !defeatedFlag) {
      chars[defendCharIndex].healthPoints -= chars[attackCharIndex].attackPoints; // Attacker hits defender
      chars[attackCharIndex].healthPoints -= chars[defendCharIndex].counterAttackPoints; // Defender hits attacker
      displayFight();
      chars[attackCharIndex].attackPoints += baseAP; // Attacker increases attack power by base attack power
    }

    // If defender health points <= 0 or attacker health points <= 0
    if (attackCharIndex > -1 && defendCharIndex > -1 && chars[defendCharIndex].healthPoints <= 0 && chars[attackCharIndex].healthPoints > 0 && defeatedEnemies < 3 && !defeatedFlag) {
      displayDefenderDefeat();
      defeatedEnemies++;
      defendCharIndex = -1;  
    }
      
    if (attackCharIndex > -1 && defendCharIndex > -1 && chars[attackCharIndex].healthPoints <= 0 && defeatedEnemies < 3 && !defeatedFlag) {
      displayAttackerDefeated();
      defeatedFlag = true;
    }
    
    // If all enemies are defeated
    if (attackCharIndex > -1 && defeatedEnemies === 3 && !defeatedFlag && !wonFlag) {
      displayAttackerWins();
      wonFlag = true;
    }
  });

  // Event listener for restart button
  $(document).on("click", "#restart-btn", function() {
    startGame();
    displayStart();
  });
});