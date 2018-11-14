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
    var counterAttackPoints = Math.ceil(Math.random() * 10); // Counter attack points 1-50
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
  var baseAP;

  // Declare flags
  var attackChar = [];
  var enemyChars = [];
  var defendChar = [];
  var attackerSelected = false;
  var defenderSelected = false;
  var defeatedFlag = false;
  var wonFlag = false;
  var defeatedEnemies = 0;


  // FUNCTIONS
  // =========


  // Update dispaly function
  function displayUpdate() {

    // Update positioning of characters: attacker, enemies and defender
    if (wonFlag) {
      // Move characters to top of display (default position)
      $(".attacker-disp > .chars-btns").remove();
      // $(".start-disp > button").attr({class: "chars-btns", id: "char1-btn"});
      $(".start-disp > .remove-disp").remove();
      $(".start-disp").append("<button class='chars-btns' id='char1-btn'></button>");
      $(".start-disp").append("<button class='chars-btns' id='char2-btn'></button>");
      $(".start-disp").append("<button class='chars-btns' id='char3-btn'></button>");
      $(".start-disp").append("<button class='chars-btns' id='char4-btn'></button>");
      $(".start-disp > #char1-btn").append("<p id='char1-name'></p>");
      $(".start-disp > #char1-btn").append("<p id='char1-hp'></p>");
      $(".start-disp > #char2-btn").append("<p id='char2-name'></p>");
      $(".start-disp > #char2-btn").append("<p id='char2-hp'></p>");
      $(".start-disp > #char3-btn").append("<p id='char3-name'></p>");
      $(".start-disp > #char3-btn").append("<p id='char3-hp'></p>");
      $(".start-disp > #char4-btn").append("<p id='char4-name'></p>");
      $(".start-disp > #char4-btn").append("<p id='char4-hp'></p>");
      

    } else if (attackerSelected && !defenderSelected) {
      // Remove characters from top of display
      $(".start-disp > button").attr({class: "remove-disp", id: "remove-disp"});

    } else if (attackerSelected && defenderSelected) {
      // Remove defender from enemies position 
      // $(".enemies-disp > button").attr

    }

  }

  // Restart game function
  function restartGame() {

    // Reset character position if game over
    displayUpdate();

    // Reset character attributes
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
    attackChar = "";
    enemyChars = [];
    attackerSelected = false;
    defenderSelected = false;
    defeatedEnemies = 0;
    defeatedFlag = false;
    wonFlag = false;

    // Update character name and attributes
    $("#char1-name").text(char1.name);
    $("#char1-hp").text(char1HP);
    $("#char2-name").text(char2.name);
    $("#char2-hp").text(char2HP);
    $("#char3-name").text(char3.name);
    $("#char3-hp").text(char3HP);
    $("#char4-name").text(char4.name);
    $("#char4-hp").text(char4HP);

    $("#result-disp > p").remove();
    $("#result-disp > button").remove();
  }

  // MAIN CONTROLLER
  restartGame();
  displayUpdate();

  // Event listener for button presses to select attacker
  $(".start-disp > button").on("click", function() {

    // If attacker not selected and character button pressed
    if (!attackerSelected) {
      switch($(this).attr("id")) {
        
        // If character 1 selected as attacker
        case "char1-btn":
          attackChar = [char1.name, char1HP, char1AP, char1CAP];
          enemyChars = [char2, char3, char4];
          
          // Position attacker
          $(".attacker-disp").append("<button class='chars-btns' id='char1-btn'></button");
          $(".attacker-disp > #char1-btn").append("<p id='char1-name'></p>");
          $(".attacker-disp > #char1-btn").append("<p id='char1-hp'></p>");
          $(".chars-btns > #char1-name").text(char1.name);
          $(".chars-btns > #char1-hp").text(char1HP);

          // Position enemies
          $(".enemies-disp").append("<button class='chars-btns' id='char2-btn'></button");
          $(".enemies-disp > #char2-btn").append("<p id='char2-name'></p>");
          $(".enemies-disp > #char2-btn").append("<p id='char2-hp'></p>");
          $(".chars-btns > #char2-name").text(char2.name);
          $(".chars-btns > #char2-hp").text(char2HP);
          $(".enemies-disp").append("<button class='chars-btns' id='char3-btn'></button");
          $(".enemies-disp > #char3-btn").append("<p id='char3-name'></p>");
          $(".enemies-disp > #char3-btn").append("<p id='char3-hp'></p>");
          $(".chars-btns > #char3-name").text(char3.name);
          $(".chars-btns > #char3-hp").text(char3HP);
          $(".enemies-disp").append("<button class='chars-btns' id='char4-btn'></button");
          $(".enemies-disp > #char4-btn").append("<p id='char4-name'></p>");
          $(".enemies-disp > #char4-btn").append("<p id='char4-hp'></p>");
          $(".chars-btns > #char4-name").text(char4.name);
          $(".chars-btns > #char4-hp").text(char4HP);
          break;

        // If character 2 selected as attacker
        case "char2-btn":
          attackChar = [char2.name, char2HP, char2AP, char2CAP];
          enemyChars = [char1, char3, char4];

          // Position attacker
          $(".attacker-disp").append("<button class='chars-btns' id='char2-btn'></button");
          $(".attacker-disp > #char2-btn").append("<p id='char2-name'></p>");
          $(".attacker-disp > #char2-btn").append("<p id='char2-hp'></p>");
          $(".chars-btns > #char2-name").text(char2.name);
          $(".chars-btns > #char2-hp").text(char2HP);
          // Position enemies
          $(".enemies-disp").append("<button class='chars-btns' id='char1-btn'></button");
          $(".enemies-disp > #char1-btn").append("<p id='char1-name'></p>");
          $(".enemies-disp > #char1-btn").append("<p id='char1-hp'></p>");
          $(".chars-btns > #char1-name").text(char1.name);
          $(".chars-btns > #char1-hp").text(char1HP);
          $(".enemies-disp").append("<button class='chars-btns' id='char3-btn'></button");
          $(".enemies-disp > #char3-btn").append("<p id='char3-name'></p>");
          $(".enemies-disp > #char3-btn").append("<p id='char3-hp'></p>");
          $(".chars-btns > #char3-name").text(char3.name);
          $(".chars-btns > #char3-hp").text(char3HP);
          $(".enemies-disp").append("<button class='chars-btns' id='char4-btn'></button");
          $(".enemies-disp > #char4-btn").append("<p id='char4-name'></p>");
          $(".enemies-disp > #char4-btn").append("<p id='char4-hp'></p>");
          $(".chars-btns > #char4-name").text(char4.name);
          $(".chars-btns > #char4-hp").text(char4HP);
          break;

        // If character 3 selected as attacker
        case "char3-btn":
          attackChar = [char3.name, char3HP, char3AP, char3CAP];
          enemyChars = [char1, char2, char4];

          // Position attacker
          $(".attacker-disp").append("<button class='chars-btns' id='char3-btn'></button");
          $(".attacker-disp > #char3-btn").append("<p id='char3-name'></p>");
          $(".attacker-disp > #char3-btn").append("<p id='char3-hp'></p>");
          $(".chars-btns > #char3-name").text(char3.name);
          $(".chars-btns > #char3-hp").text(char3HP);
          // Position enemies
          $(".enemies-disp").append("<button class='chars-btns' id='char1-btn'></button");
          $(".enemies-disp > #char1-btn").append("<p id='char1-name'></p>");
          $(".enemies-disp > #char1-btn").append("<p id='char1-hp'></p>");
          $(".chars-btns > #char1-name").text(char1.name);
          $(".chars-btns > #char1-hp").text(char1HP);
          $(".enemies-disp").append("<button class='chars-btns' id='char2-btn'></button");
          $(".enemies-disp > #char2-btn").append("<p id='char2-name'></p>");
          $(".enemies-disp > #char2-btn").append("<p id='char2-hp'></p>");
          $(".chars-btns > #char2-name").text(char2.name);
          $(".chars-btns > #char2-hp").text(char2HP);
          $(".enemies-disp").append("<button class='chars-btns' id='char4-btn'></button");
          $(".enemies-disp > #char4-btn").append("<p id='char4-name'></p>");
          $(".enemies-disp > #char4-btn").append("<p id='char4-hp'></p>");
          $(".chars-btns > #char4-name").text(char4.name);
          $(".chars-btns > #char4-hp").text(char4HP);
          break;
          
        // If character 4 selected as attacker
        case "char4-btn":
          attackChar = [char4.name, char4HP, char4AP, char4CAP];
          enemyChars = [char1, char2, char3];

          // Position attacker
          $(".attacker-disp").append("<button class='chars-btns' id='char4-btn'></button");
          $(".attacker-disp > #char4-btn").append("<p id='char4-name'></p>");
          $(".attacker-disp > #char4-btn").append("<p id='char4-hp'></p>");
          $(".chars-btns > #char4-name").text(char4.name);
          $(".chars-btns > #char4-hp").text(char4HP);
          // Position enemies
          $(".enemies-disp").append("<button class='chars-btns' id='char1-btn'></button");
          $(".enemies-disp > #char1-btn").append("<p id='char1-name'></p>");
          $(".enemies-disp > #char1-btn").append("<p id='char1-hp'></p>");
          $(".chars-btns > #char1-name").text(char1.name);
          $(".chars-btns > #char1-hp").text(char1HP);
          $(".enemies-disp").append("<button class='chars-btns' id='char2-btn'></button");
          $(".enemies-disp > #char2-btn").append("<p id='char2-name'></p>");
          $(".enemies-disp > #char2-btn").append("<p id='char2-hp'></p>");
          $(".chars-btns > #char2-name").text(char2.name);
          $(".chars-btns > #char2-hp").text(char2HP);
          $(".enemies-disp").append("<button class='chars-btns' id='char3-btn'></button");
          $(".enemies-disp > #char3-btn").append("<p id='char3-name'></p>");
          $(".enemies-disp > #char3-btn").append("<p id='char3-hp'></p>");
          $(".chars-btns > #char3-name").text(char3.name);
          $(".chars-btns > #char3-hp").text(char3HP);
          break;
      }
      baseAP = attackChar[2];
      attackerSelected = true;
      displayUpdate();
    }
  });
  
  // Event listener for button presses to select defender
  $(document).on("click", ".enemies-disp > button", function() {
    console.log($(this).attr("id"));
    // If attacker selected but defender not selected and character button pressed
    if (attackerSelected && !defenderSelected) {

      switch($(this).attr("id")) {
        case "char1-btn":
          if (attackChar !== char1) {
            defendChar = [char1.name, char1HP, char1AP, char1CAP, "char1-hp"];
            enemyChars = [char2, char3, char4]
           
            // Position defender
            $(".defender-disp").append("<button class='chars-btns' id='char1-btn'></button");
            $(".defender-disp > #char1-btn").append("<p id='char1-name'></p>");
            $(".defender-disp > #char1-btn").append("<p id='char1-hp'></p>");
            $(".chars-btns > #char1-name").text(char1.name);
            $(".chars-btns > #char1-hp").text(char1HP);

            // Remove defender from enemies
            $(".enemies-disp > #char1-btn").attr({class: "remove-disp", id: "remove-disp"});

          }
          break;

        case "char2-btn":
          if (attackChar !== char2) {
            defendChar = [char2.name, char2HP, char2AP, char2CAP, "char2-hp"];

            // Position defender
            $(".defender-disp").append("<button class='chars-btns' id='char2-btn'></button");
            $(".defender-disp > #char2-btn").append("<p id='char2-name'></p>");
            $(".defender-disp > #char2-btn").append("<p id='char2-hp'></p>");
            $(".chars-btns > #char2-name").text(char2.name);
            $(".chars-btns > #char2-hp").text(char2HP);

            // Remove defender from enemies
            $(".enemies-disp > #char2-btn").attr({class: "remove-disp", id: "remove-disp"});
          }
          break;

        case "char3-btn":
          if (attackChar !== char3) {
            defendChar = [char3.name, char3HP, char3AP, char3CAP, "char3-hp"];

            // Position defender
            $(".defender-disp").append("<button class='chars-btns' id='char3-btn'></button");
            $(".defender-disp > #char3-btn").append("<p id='char3-name'></p>");
            $(".defender-disp > #char3-btn").append("<p id='char3-hp'></p>");
            $(".chars-btns > #char3-name").text(char3.name);
            $(".chars-btns > #char3-hp").text(char3HP);

            // Remove defender from enemies
            $(".enemies-disp > #char3-btn").attr({class: "remove-disp", id: "remove-disp"});
          }
          break;

        case "char4-btn":
          if (attackChar !== char4) {
            defendChar = [char4.name, char4HP, char4AP, char4CAP, "char4-hp"];;

            // Position defender
            $(".defender-disp").append("<button class='chars-btns' id='char4-btn'></button");
            $(".defender-disp > #char4-btn").append("<p id='char4-name'></p>");
            $(".defender-disp > #char4-btn").append("<p id='char4-hp'></p>");
            $(".chars-btns > #char4-name").text(char4.name);
            $(".chars-btns > #char4-hp").text(char4HP);

            // Remove defender from enemies
            $(".enemies-disp > #char4-btn").attr({class: "remove-disp", id: "remove-disp"});
          }
          break;
      }
      defenderSelected = true;
      displayUpdate();
    }
  });

  // Event listener for attack button
  $("#attack-btn").on("click", function() {

    // If no enemy selected and press attack button
    if (attackerSelected && !defenderSelected && defeatedEnemies < 3 && !defeatedFlag) {
      
      $("#result-disp > p").remove();
      $("#result-disp").append("<p>No enemy here.</p>");
      
    // If fight, adjust attributes
    } else if (attackerSelected && defenderSelected && defeatedEnemies < 3 && !defeatedFlag) {
      $("#result-disp > p").remove();

      defendChar[1] -= attackChar[2]; // Attacker hits defender
      attackChar[2] += baseAP; // Attacker increases attack power by base attack power
      attackChar[1] -= defendChar[3]; // Defender hits attacker
      
      $("#result-disp > p").remove();
      $("#result-disp").append("<p>You attacked " + defendChar[0] + " for " + attackChar[2] + " damage.</p>");
      $("#result-disp").append("<p>" + defendChar[0] + " attacked you back for " + defendChar[3] + " damage.</p>");


      // Update character health points
      // switch (defendChar[0]) {
      //   case char1.name:
      //     $("#char1-hp").text(defendChar[1]);
      //     break;

      //   case char2.name:
      //     $("#char2-hp").text(defendChar[1]);
      //     break;

      //   case char3.name:
      //     $("#char3-hp").text(defendChar[1]);
      //     break;

      //   case char4.name:
      //     $("#char4-hp").text(defendChar[1]);
      //     break;
    }

    // If defender health points <= 0 or less
    if (attackerSelected && defenderSelected && defendChar[1] <= 0 && defeatedEnemies < 3 && !defeatedFlag) {
      defenderSelected = false;
      defeatedEnemies++;
      console.log(defeatedEnemies);
      console.log(defenderSelected);

      $(".defender-disp > button").remove();
      $("#result-disp > p").remove();

      $("#result-disp").append("<p>You have defeated " + defendChar[0] + ", you can choose to fight another enemy.</p>");
    
    // If attacker health points <= 0 and defender health points > 0
    } else if (attackerSelected && defenderSelected && attackChar[1] <= 0 && defendChar > 0 && !defeatedFlag) {
      $("#result-disp > p").remove();
      $("#result-disp").append("<p>You have been defeated...GAME OVER!!!</p>");
      $("#result-disp").append("<button class='restart-btn'>Restart</button");
      defeatedFlag = true;
      console.log(defeatedFlag);
    }
    
    // If all enemies are defeated
    if (attackerSelected && defeatedEnemies === 3 && !defeatedFlag && !wonFlag) {
      $("#result-disp > p").remove();
      $("#result-disp").append("<p>You Won!!!! GAME OVER!!!</p>");
      $("#result-disp").append("<button class='restart-btn'>Restart</button");
      wonFlag = true;
    }
  });

  // Event listener for restart button
  $(document).on("click", "#result-disp > button", function() {
    console.log($(this).attr("class"));
    restartGame();
  });
});