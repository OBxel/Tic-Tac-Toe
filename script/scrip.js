/* constants */

const winning = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/* state */

let board;
let turn = "X";
let win;

/* element ref */

const square = Array.from(document.querySelectorAll("#board div"));

/* event listeners */
const msg = document.querySelector("h2");
document.getElementById("reset-btn").addEventListener("click", init);

/* functions */

function getWinner() {
  let winner = null;

  winning.forEach(function (combo, index) {
    if (
      board[combo[0]] &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[0]] === board[combo[2]]
    ) {
      winner = board[combo[0]];
    }
  });
  if (winner) {
    return winner;
  } else if (board.includes("")) {
    return null;
  } else {
    return "T";
  }
}

function handleTurn() {
  let i = square.findIndex(function (square) {
    return square === event.target;
  });
  document.querySelectorAll(".square")[i].classList.add("noclick");
  board[i] = turn;
  if (turn === "X") turn = "O";
  else turn = "X";
  win = getWinner();

  render();
}

function init() {
  board = ["", "", "", "", "", "", "", "", ""];
  document
    .querySelectorAll(".square")
    .forEach((cell) => cell.classList.remove("noclick"));
  render();
  document.getElementById("board").addEventListener("click", (e) => {
    handleTurn();
  });
  msg.textContent = "It's X turn!";
}

function score() {
  let player1 = 0;
  let player2 = 0;
  let msg = "";

  if (msg === "X wins the game!") {
    player1 += 1;
    console.log(player1);
  } else if (msg === "O wins the game!") {
    player2 += 1;
  }
}

function render() {
  board.forEach(function (mark, index) {
    square[index].textContent = mark;
  });
  msg.textContent =
    win === "T"
      ? "That's a tie"
      : win
      ? `${win} wins the game!`
      : `It's ${turn}'s turn!`;
  score();
}

init();
