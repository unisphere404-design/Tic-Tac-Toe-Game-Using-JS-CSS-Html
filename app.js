let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let popOverlay = document.querySelector(".popup-overlay");
let playAgainBtn = document.querySelector("#play-again-btn");
let gameStatus = document.querySelector("#game-status");
let msg = document.querySelector("#msg");

let playerX = true;
let whoWin = -1;

const winCond = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let freeze = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

let resetGame = () => {
    for (let box of boxes) {
        box.innerText = "";
        box.disabled = false;
        box.classList.remove("winning-box");
    }
    playerX = true;
    whoWin = -1;
};

let checkWinner = () => {
    for (let pattern of winCond) {
        let [p1, p2, p3] = pattern;

        if (
            boxes[p1].innerText !== "" &&
            boxes[p1].innerText === boxes[p2].innerText &&
            boxes[p2].innerText === boxes[p3].innerText
        ) {
            whoWin = boxes[p1].innerText;

            boxes[p1].classList.add("winning-box");
            boxes[p2].classList.add("winning-box");
            boxes[p3].classList.add("winning-box");

            freeze();
            return;
        }
    }
};

let whenToPop = () => {
    let toPop = true;
    for (let box of boxes) {
        if (!box.disabled) {
            toPop = false;
            break;
        }
    }
    if (toPop) popMethod();
};

let showPopup = () => {
    popOverlay.style.display = "flex";
};

let closePopup = () => {
    popOverlay.style.display = "none";
};

let popMethod = () => {
    if (whoWin == -1) {
        gameStatus.innerText = "Game Draw!";
        msg.innerText = "It's a tie! Try again.";
    } else {
        gameStatus.innerText = `🎉 Player ${whoWin} Won! 🎉`;
        msg.innerText = `Congratulations! Player ${whoWin}`;
    }
    showPopup();
};

// Event Listeners
resetBtn.addEventListener("click", () => {
    resetGame();
});

playAgainBtn.addEventListener("click", () => {
    closePopup();
    resetGame();
});

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (playerX) {
            box.innerText = "X";
        } else {
            box.innerText = "O";
        }
        box.disabled = true;
        playerX = !playerX;
        checkWinner();

        setTimeout(() => {
            whenToPop();
        }, 1000);
    });
});
