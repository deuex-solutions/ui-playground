var grid = document.getElementById("grid");
var msg = document.querySelector(".message");
var chooser = document.querySelector("form");
var mark;
var cells;
var moves = 0;

function setPlayer() {
  mark = this.value;
  msg.textContent = "You selected " + mark;
  chooser.classList.add("game-on");
  this.checked = false;
  buildGrid();
}

function playerMove() {
  if (this.textContent == "") {
    this.textContent = mark;
    moves++;
    const winner = checkRow();
    switchMark();
    setTimeout(() => !winner && computerMove(), 500);
  }
}

function computerMove() {
  var emptyCells = [];
  var random;

  cells.forEach(function (cell) {
    if (cell.textContent == "") {
      emptyCells.push(cell);
    }
  });
  random = Math.ceil(Math.random() * emptyCells.length) - 1;
  emptyCells[random].textContent = mark;
  moves++;
  if (emptyCells[random].textContent == undefined) alert("tie");
  checkRow();
  switchMark();
}

function switchMark() {
  if (mark == "X") {
    mark = "O";
  } else {
    mark = "X";
  }
}

function winner(a, b, c) {
  if (moves >= 9) msg.textContent = "Game Tie";
  if (a.textContent == mark && b.textContent == mark && c.textContent == mark) {
    msg.textContent = mark + " is the winner!";
    a.classList.add("winner");
    b.classList.add("winner");
    c.classList.add("winner");
    grid.classList.add("disabled");
    return true;
  } else {
    return false;
  }
}

function checkRow() {
  if (
    winner(
      document.getElementById("c1"),
      document.getElementById("c2"),
      document.getElementById("c3")
    )
  )
    return true;
  else if (
    winner(
      document.getElementById("c4"),
      document.getElementById("c5"),
      document.getElementById("c6")
    )
  )
    return true;
  else if (
    winner(
      document.getElementById("c7"),
      document.getElementById("c8"),
      document.getElementById("c9")
    )
  )
    return true;
  else if (
    winner(
      document.getElementById("c1"),
      document.getElementById("c4"),
      document.getElementById("c7")
    )
  )
    return true;
  else if (
    winner(
      document.getElementById("c2"),
      document.getElementById("c5"),
      document.getElementById("c8")
    )
  )
    return true;
  else if (
    winner(
      document.getElementById("c3"),
      document.getElementById("c6"),
      document.getElementById("c9")
    )
  )
    return true;
  else if (
    winner(
      document.getElementById("c1"),
      document.getElementById("c5"),
      document.getElementById("c9")
    )
  )
    return true;
  else if (
    winner(
      document.getElementById("c3"),
      document.getElementById("c5"),
      document.getElementById("c7")
    )
  )
    return true;
}

function resetGrid() {
  grid.classList.remove("disabled");
  moves = 0;
  mark = "X";
  cells.forEach(function (cell) {
    cell.textContent = "";
    cell.classList.remove("winner");
  });
  msg.textContent = "Choose your player:";
  chooser.classList.remove("game-on");
  grid.innerHTML = "";
}

function buildGrid() {
  for (var i = 1; i <= 9; i++) {
    var cell = document.createElement("li");
    cell.id = "c" + i;
    cell.addEventListener("click", playerMove, false);
    grid.appendChild(cell);
  }
  cells = Array.prototype.slice.call(grid.getElementsByTagName("li"));
}

var players = Array.prototype.slice.call(
  document.querySelectorAll("input[name=player-choice]")
);

players.forEach(function (choice) {
  choice.addEventListener("click", setPlayer, false);
});

var resetButton = chooser.querySelector("button");
resetButton.addEventListener("click", function (e) {
  e.preventDefault();
  moves = 0;
  resetGrid();
});
