var data = {};
var last = {};
var players = [];

NUM_TURNS = 5;
addedCityLabel = false

function mode(array) {
  if(array.length == 0)
    return null;

  var modeMap = {};
  var maxEl = array[0], maxCount = 1;

  for(var i = 0; i < array.length; i++) {
    var el = array[i];
    if(modeMap[el] == null)
        modeMap[el] = 1;
      else
        modeMap[el]++;  
      if(modeMap[el] > maxCount){
        maxEl = el;
        maxCount = modeMap[el];
      }
    }

  return maxEl;
}

function inGame(){
  return document.getElementById("game-leaderboard");
}

function getArmy(player){
  var leaderboard = document.getElementById('game-leaderboard');
  var player_cell = leaderboard.querySelectorAll('.leaderboard-name.' + player);
  return parseInt(player_cell[0].nextSibling.nextSibling.innerHTML);
}

function updateCities(player, cities){
  var leaderboard = document.getElementById('game-leaderboard');
  var player_cell = leaderboard.querySelectorAll('.leaderboard-name.' + player);
  player_cell[0].nextSibling.innerHTML = cities;
}

function turn(){
  var leaderboard = document.getElementById('game-leaderboard');

  // Initialise columns
  if(!addedCityLabel){
    leaderboard.rows[0].insertCell(leaderboard.rows[0].cells.length - 2).innerHTML = "Cities";
    var table_length = leaderboard.rows[0].cells.length;

    for (var i = 0, row; row = leaderboard.rows[i + 1]; i ++){
      var x = row.insertCell(table_length - 3);
      x.innerHTML = "0";

      // Store player data
      players.push(row.children[table_length - 4].classList[1]);
      data[players[i]] = new Array();
      last[players[i]] = new Array();
    }
    addedCityLabel = true;
  }

  // Update city counts
  for(var i = 0; i < players.length; i++) {
    var player = players[i];
    var current_army = getArmy(player);

    // Save army count
    last[player].push(current_army);

    // Check change in army
    if(last[player].length > 1) {
      var army_change = current_army - last[player][last[player].length - 2];

      // Save army change
      if (army_change > 0) {
        data[player].push(army_change);

        // Calculate number of cities
        if(data[player].length >= NUM_TURNS) {
          var guess_cities = mode(data[player].slice(data[player].length - NUM_TURNS));
          updateCities(player, guess_cities - 1); 
        }
      }
    }
  }
}

turnInterval = setInterval(function() {
  if (inGame()){
    turn();
  } else {
    addedCityLabel = false
  }
}, 500);
