let boxes = document.querySelectorAll(".box");
let turn = "X";
let isGameOver = false;

let isNewMode = document.getElementById("toggleButton").checked;
let movesX = [];
let movesO = [];

document.getElementById("toggleButton").addEventListener("change", function () {
    isNewMode = this.checked;
    isGameOver = false;
    turn = "X";
    movesO = [];
    movesX = [];
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.classList.remove("first-move");
        e.style.color = "#fff";
    });
});
boxes.forEach(e => {
    e.innerHTML = "";
    if (isNewMode) e.classList.remove("first-move");
    e.addEventListener("click", () => {
        if (!isGameOver && e.innerHTML === "") {
            e.innerHTML = turn;
            if (turn == "X") {
                if (isNewMode) movesX.push(e);
                if (movesX.length == 3) {
                    if (isNewMode) movesX[0].classList.add("first-move");
                } else if (movesX.length > 3) {
                    movesX[0].innerHTML = "";
                    if (isNewMode) movesX[0].classList.remove("first-move");
                    movesX.shift();
                    if (isNewMode) movesX[0].classList.add("first-move");
                };
            } else {
                if (isNewMode) movesO.push(e);
                if (movesO.length == 3) {
                    if (isNewMode) movesO[0].classList.add("first-move");
                } else if (movesO.length > 3) {
                    movesO[0].innerHTML = "";
                    if (isNewMode) movesO[0].classList.remove("first-move");
                    movesO.shift();
                    if (isNewMode) movesO[0].classList.add("first-move");
                };
            };
            checkWin();
            checkDraw();
            changeTurn();
        };
    });
});

function checkWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < winConditions.length; i++) {
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        if (v0 != "" && v0 === v1 && v0 === v2) {
            resetGame(`${turn} Wins`);
            for (j = 0; j < 3; j++) {
                boxes[winConditions[i][j]].style.backgroundColor = "#08D9D6"
                if (isNewMode) boxes[winConditions[i][j]].classList.remove("first-move");
                boxes[winConditions[i][j]].style.color = "#000"
            };
        };
    };
};

function checkDraw() {
    if (!isGameOver) {
        let isDraw = true;
        boxes.forEach(e => {
            if (e.innerHTML == "") isDraw = false;
        });

        if (isDraw) {
            resetGame("Draw");
            if (isNewMode) e.classList.remove("first-move");
        };
    };
};

function changeTurn() {
    if (turn == "X") {
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
    } else {
        turn = "X";
        document.querySelector(".bg").style.left = "0";
    };
};

function resetGame(message) {
    isGameOver = true;
    movesO = [];
    movesX = [];
    document.querySelector("#results").innerHTML = message;
    document.querySelector("#play-again").style.display = "inline";
};

document.querySelector("#play-again").addEventListener("click", () => {
    isGameOver = false;
    turn = "X";
    movesO = [];
    movesX = [];
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.classList.remove("first-move");
        e.style.color = "#fff";
    });
});