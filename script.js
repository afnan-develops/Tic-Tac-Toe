const boxes = document.querySelectorAll(".boxes");
const turn = document.querySelector("#turn");
const winnerScreen = document.querySelector(".winner-screen");
const winnerSymbol = document.querySelector("#winnerSymbol");
const mainBody = document.querySelector(".container");
const tieScreen = document.querySelector(".tie-screen");
const resetBtn = document.querySelector("#reset");
const newBtn = document.querySelectorAll(".new-game");
const p1Score = document.querySelector("#p1Score");
const p2Score = document.querySelector("#p2Score");
const tieScore = document.querySelector("#ties");

// Variables

let turnO = "X";
let p2Winner = 0;
let p1Winner = 0;
let tie = 0;
let winner = false;
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

// Box Slection

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO === "O") {
      box.style.color = "#fff047";
      box.innerText = "O";
      turn.textContent = "X Turn";
      turnO = "X";
    } else {
      box.innerText = "X";
      box.style.color = "#ff4754";
      turn.textContent = "O Turn";
      turnO = "O";
    }
    box.disabled = true;
    checkWinner();
  });
});

if (turnO === "O") {
  turn.innerText = "O Turn";
} else {
  turn.innerText = "X Turn";
}

// Winner and Tie Checker

const checkWinner = () => {
  winning.forEach((combination) => {
    if (winner) {
      boxes.forEach((box) => {
        box.disabled = true;
      });
      return;
    }
    const box1 = boxes[combination[0]].innerText;
    const box2 = boxes[combination[1]].innerText;
    const box3 = boxes[combination[2]].innerText;

    if (box1 === box2 && box2 === box3 && box1 !== "") {
      winner = true;
      winnerSymbol.textContent = `${box1}`;
      winnerScreen.classList.remove("winner-hidden");
      if (box1 === "O") {
        winnerSymbol.style.color = "#fff047";
        p2Winner = p2Winner + 1;
        p2Score.textContent = p2Winner;
      } else {
        winnerSymbol.style.color = "#ff4754";
        p1Winner = p1Winner + 1;
        p1Score.textContent = p1Winner;
      }
      mainBody.classList.add("inactive");
      // winner = winner+1;
    }
  });

  if (!winner && Array.from(boxes).every((box) => box.innerText !== "")) {
    tieScreen.classList.remove("tie-hidden");
    mainBody.classList.add("inactive");
    tie = tie + 1;
    tieScore.textContent = tie;
  }
};

// Reset Button

const resetGame = () => {
  turn.textContent = "X Turn";
  turnO = "X";
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  p2Winner = 0;
  p1Winner = 0;
  tie = 0;
  p1Score.textContent = 0;
  p2Score.textContent = 0;
  tieScore.textContent = 0;
  winner = false;
};

resetBtn.addEventListener("click", resetGame);

// New Game Button

const newGame = () => {
  turn.textContent = "O Turn";
  if (turnO === "O") {
    turn.innerText = "O Turn";
  } else {
    turn.innerText = "X Turn";
  }
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  winnerScreen.classList.add("winner-hidden");
  tieScreen.classList.add("tie-hidden");
  mainBody.classList.remove("inactive");
  winner = false;
};

newBtn.forEach((btn) => {
  btn.addEventListener("click", newGame);
});
