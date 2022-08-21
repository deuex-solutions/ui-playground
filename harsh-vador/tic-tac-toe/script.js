var grid = document.getElementById("grid");
var msg = document.querySelector(".message");
var chooser = document.querySelector("form");
var mark;
var cells;
var moves = 0;
var userName = document.querySelector(".name");
var table = document.querySelector(".table");
var submitBtn = document.querySelector(".submit_button");
let origBoard;
let huPlayer = "O";
let aiPlayer = "X";

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [6, 4, 2],
  [2, 5, 8],
  [1, 4, 7],
  [0, 3, 6],
];

const diff_cells = document.querySelectorAll(".cell");

function setPlayer() {
  mark = this.value;
  msg.textContent = "";
  userName = userName.value;
  this.checked = true;
}

function gamelaunch() {
  if (document.getElementById("username").value != "") {
    if (mark == "X") buildGrid();
    else if (mark == "O") startGame();
    else alert("Select Level");
  } else {
    alert("Enter Name");
  }
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
  if (
    mark == "X" &&
    a.textContent == mark &&
    b.textContent == mark &&
    c.textContent == mark
  ) {
    msg.textContent = userName.value + " is the winner!";
    a.classList.add("winner");
    b.classList.add("winner");
    c.classList.add("winner");
    grid.classList.add("disabled");
    userName.value = "";
    return true;
  } else if (
    mark == "O" &&
    a.textContent == mark &&
    b.textContent == mark &&
    c.textContent == mark
  ) {
    msg.textContent = "Computer Wins";
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
  msg.textContent = "";
  chooser.classList.remove("game-on");
  grid.innerHTML = "";
  userName.value = "";
  submitBtn.style.display = "initial";
}

function buildGrid() {
  submitBtn.style.display = "none";

  chooser.classList.add("game-on");
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
  choice.addEventListener("click", setPlayer);
});
var resetButton = chooser.querySelector("#reset");
resetButton.addEventListener("click", function (e) {
  e.preventDefault();
  moves = 0;
  resetGrid();
});

function selectSym(sym) {
  huPlayer = sym;
  aiPlayer = sym === "O" ? "X" : "O";
  origBoard = Array.from(Array(9).keys());
  for (let i = 0; i < diff_cells.length; i++) {
    diff_cells[i].addEventListener("click", turnClick, false);
  }
  if (aiPlayer === "X") {
    turn(bestSpot(), aiPlayer);
  }
  document.querySelector(".selectSym").style.display = "none";
}

function startGame() {
  submitBtn.style.display = "none";

  chooser.classList.add("game-on");
  table.classList.add("show_table");
  document.querySelector("#reset").style.display = "none";
  document.querySelector(".endgame").style.display = "none";
  document.querySelector(".endgame .text").innerText = "";
  document.querySelector(".selectSym").style.display = "block";
  for (let i = 0; i < diff_cells.length; i++) {
    diff_cells[i].innerText = "";
    diff_cells[i].style.removeProperty("background-color");
  }
}

function turnClick(square) {
  if (typeof origBoard[square.target.id] === "number") {
    turn(square.target.id, huPlayer);
    if (!checkWin(origBoard, huPlayer) && !checkTie())
      turn(bestSpot(), aiPlayer);
  }
}

function turn(squareId, player) {
  origBoard[squareId] = player;
  document.getElementById(squareId).innerHTML = player;
  let gameWon = checkWin(origBoard, player);
  if (gameWon) gameOver(gameWon);
  checkTie();
}

function checkWin(board, player) {
  let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
  let gameWon = null;
  for (let [index, win] of winCombos.entries()) {
    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      gameWon = { index: index, player: player };
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon) {
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor =
      gameWon.player === huPlayer ? "blue" : "red";
  }
  for (let i = 0; i < diff_cells.length; i++) {
    diff_cells[i].removeEventListener("click", turnClick, false);
  }
  declareWinner(
    gameWon.player === huPlayer
      ? userName.value + " is the Winner"
      : "Computer Wins"
  );
}

function declareWinner(who) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerText = who;
}
function emptySquares() {
  return origBoard.filter((elm, i) => i === elm);
}

function bestSpot() {
  return minimax(origBoard, aiPlayer).index;
}

function checkTie() {
  if (emptySquares().length === 0) {
    for (cell of diff_cells) {
      cell.style.backgroundColor = "green";
      cell.removeEventListener("click", turnClick, false);
    }
    declareWinner("Tie game");
    return true;
  }
  return false;
}

function minimax(newBoard, player) {
  var availSpots = emptySquares(newBoard);

  if (checkWin(newBoard, huPlayer)) {
    return { score: -10 };
  } else if (checkWin(newBoard, aiPlayer)) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }

  var moves = [];
  for (let i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if (player === aiPlayer) move.score = minimax(newBoard, huPlayer).score;
    else move.score = minimax(newBoard, aiPlayer).score;
    newBoard[availSpots[i]] = move.index;
    if (
      (player === aiPlayer && move.score === 10) ||
      (player === huPlayer && move.score === -10)
    )
      return move;
    else moves.push(move);
  }

  let bestMove, bestScore;
  if (player === aiPlayer) {
    bestScore = -1000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    bestScore = 1000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}
