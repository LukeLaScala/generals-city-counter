function createCell(cell, text, style) {
  var div = document.createElement('div'), // create DIV element
  txt = document.createTextNode(text); // create text node
  div.appendChild(txt);                    // append text node to the DIV
  div.setAttribute('class', style);        // set DIV class attribute
  div.setAttribute('className', style);    // set DIV class attribute for IE (?!)
  cell.parentElement.appendChild(div);                   // append DIV to the table cell
}

function appendColumn() {
        var tbl = document.getElementById('game-leaderboard'), // table reference
        i;
        // open loop for each row and append cell
        for (i = 0; i < tbl.rows.length; i++) {
                if (i == 0){
                  var x = tbl.rows[i].insertCell(2 + inTeamGame);
                  x.innerHTML = "Cities"
                } else {
                var x = tbl.rows[i].insertCell(2 + inTeamGame);
                x.innerHTML = "0"
                }
        }
}

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

function playingTeamGame(){
  var leaderboard = document.getElementById('game-leaderboard');
  return leaderboard.rows[0].children[0].innerHTML == "Team";
}


var data = {};
var last = {};
var cities = {};
var players = [];

addedCityLabel = false
inTeamGame = 0

function getPlayerArmy(player){
  var players = document.getElementById("game-leaderboard").querySelectorAll('.leaderboard-name').length;
  var leaderboard = document.getElementById('game-leaderboard');
  for (var i = 0; i < players; i++){
    if(leaderboard.rows[i + 1].children[1 + inTeamGame].classList[1] == player){
      return leaderboard.rows[i + 1].children[3 + inTeamGame].innerHTML;
    }
  }

  return null
}

function setPlayerCities(player, cities){
  var players = document.getElementById("game-leaderboard").querySelectorAll('.leaderboard-name').length;
  var leaderboard = document.getElementById('game-leaderboard')
  for (var i = 0; i < players; i++){
    if(leaderboard.rows[i + 1].children[1 + inTeamGame].classList[1] == player){
      leaderboard.rows[i + 1].children[2 + inTeamGame].innerHTML = cities;
    }
  }
}

function turn(){

    if(!addedCityLabel){

      appendColumn();  


      var elementExists = document.getElementById("game-leaderboard");
      var numplayers = elementExists.querySelectorAll('.leaderboard-name').length;
      var leaderboard = document.getElementById('game-leaderboard');

      for (var i = 0; i < numplayers; i ++){
        players.push(leaderboard.rows[i + 1].children[1 + inTeamGame].classList[1]);
      }

      for (var i = 0; i < numplayers; i++) {
        data[players[i]] = new Array();
        last[players[i]] = new Array();
        last[players[i]] = new Array();
        cities[players[i]] = new Array();
      }

      addedCityLabel = true;
    }

    var leaderboard = document.getElementById('game-leaderboard');
    var elementExists = document.getElementById("game-leaderboard");
    var numplayers = elementExists.querySelectorAll('.leaderboard-name').length;
    
    
    for(var j = 0; j < numplayers; j++){
      var playerColor = players[j];
      if (typeof last == 'undefined' || last.length < 1) {
        last[playerColor].push(getPlayerArmy(playerColor));
      }

      else {
        inc = parseInt(getPlayerArmy(playerColor)) - parseInt(last[playerColor][last[playerColor].length - 1]);
        last[playerColor].push(getPlayerArmy(playerColor));
        if (inc > 0){
          data[playerColor].push(inc);
        }

        if (inc > 0 && data[playerColor].length > 7){
          guess_cities = mode(data[playerColor].slice(data[playerColor].length - 6));
          cities[playerColor].push(guess_cities);
        }
      }

      if (!(typeof cities[playerColor] == 'undefined' || cities[playerColor].length < 1)) {
        setPlayerCities(playerColor, cities[playerColor][cities[playerColor].length - 1] - 1); 

    }
  }
}

turnInterval = setInterval(function() {

  if (inGame()){
    if (playingTeamGame()){
      inTeamGame = 1;
    }
    turn();
  } else {
    addedCityLabel = false
  }
}, 500);