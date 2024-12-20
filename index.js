const boxesContainer = document.querySelector(".main-grid");
const turnBoxes = document.querySelectorAll(".turn-box");
const results = document.querySelector("#results");
const playAgainButton = document.querySelector(".play-again");
const modeLabel = document.querySelector("#mode-label");
const scoreX = document.querySelector("#playerX-score");
const scoreO = document.querySelector("#playerO-score");

let boxes = [];
let turn = "X";
let isGameOver = false;
let isNewMode = false;
let movesX = [];
let movesO = [];
let winsX = 0;
let winsO = 0;

// Create grid dynamically
for (let i = 0; i < 9; i++) {
    const box = document.createElement("div");
    box.classList.add("box", "align");
    boxesContainer.appendChild(box);
    boxes.push(box);
}

// Add event listeners for boxes
boxes.forEach((box, index) => {
    box.addEventListener("click", () => handleMove(box, index));
});

// Handle move
function handleMove(box, index) {
    if (!isGameOver && box.innerHTML === "") {
        box.innerHTML = turn;
        const moves = turn === "X" ? movesX : movesO;
        moves.push(index);

        if (checkWin()) {
            return;
        }

        if (checkDraw()) {
            return;
        }

        if (isNewMode && moves.length > 3) {
            const removedIndex = moves.shift();
            const boxToRemove = boxes[removedIndex];

            boxToRemove.classList.add("removing");
            
            setTimeout(() => {
                boxToRemove.innerHTML = "";
                boxToRemove.classList.remove("removing");
            }, 500);
        }

        changeTurn();
    }
}

function checkWinConditionForBox(index) {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winConditions.some(condition =>
        condition.includes(index) &&
        condition.every(i => boxes[i].innerHTML === turn)
    );
}

// Check win conditions
function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (
            boxes[a].innerHTML &&
            boxes[a].innerHTML === boxes[b].innerHTML &&
            boxes[a].innerHTML === boxes[c].innerHTML
        ) {
            isGameOver = true;
            
            boxes[a].classList.add("winner");
            boxes[b].classList.add("winner");
            boxes[c].classList.add("winner");

            results.textContent = `${turn} Wins`;
            playAgainButton.style.display = "block";

            if (turn === "X") {
                winsX++;
                scoreX.textContent = winsX;
            } else {
                winsO++;
                scoreO.textContent = winsO;
            }

            return true;
        }
    }
    return false;
}

function checkDraw() {
    if ([...boxes].every(box => box.innerHTML !== "")) {
        isGameOver = true;
        results.textContent = "It's a Draw!";
        playAgainButton.style.display = "block";
        return true;
    }
    return false;
}

function changeTurn() {
    turn = turn === "X" ? "O" : "X";
    turnBoxes.forEach(box => box.classList.toggle("active"));
}

function resetGame() {
    isGameOver = false;
    turn = "X";
    movesX = [];
    movesO = [];
    results.textContent = "";
    playAgainButton.style.display = "none";
    boxes.forEach(box => {
        box.innerHTML = "";
        box.classList.remove("winner");
    });
    turnBoxes[0].classList.add("active");
    turnBoxes[1].classList.remove("active");
}

function selectMode(mode) {
    if(mode === "custom") isNewMode = true;
    localStorage.setItem('gameMode', mode);
    document.getElementById('mode-selection').style.display = 'none';
}

playAgainButton.addEventListener("click", resetGame);
