// #37353E // #44444E // #715A5A // #D3DAD9
// #49243E // #704264 // #BB8493 // #DBAFA0

// #FDAF7B // #FFD1E3 // #EFE1D1 // #DDE6ED // #B0A4A4

let boxes = document.querySelectorAll(".box");
let gameDiv = document.querySelector(".game");
let container = document.querySelector(".container");
let resetBtn = document.querySelector("#reset-btn");

let popOverlay = document.querySelector(".popup-overlay");
let popContent = document.querySelector(".popup-content");
let playAgainBtn = document.querySelector(".close-btn");
let gameStatus = document.querySelector("#game-status");
let msg = document.querySelector("#msg");

let playerX = true;
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
    //boxes.disabled = true; //kaam nahi karega kyunki NodeList ke paas disabled property nahi hoti.
    for (let box of boxes) {
        box.disabled = true; // jeet gya to ab sare buttons freeze kr do
    }
}
/*
boxes.forEach(function(element) {
    element.disabled = true;
});
*/
// arrow function mein
// boxes.forEach(el => el.disabled = true);

let resetGame = () => {
    for (box of boxes) {
        box.innerText = "";
        box.disabled = false; // jo buttons ko disable kiye the usse enable krna h
        box.classList.remove("winning-box"); // remove glow effect
    }
    playerX = true; // not necessary // koi antar nhi game khelne mein
}

resetBtn.addEventListener("click", () => {
    resetGame();
})

let whoWin = -1;
let checkWinner = () => {
    for (let pattern of winCond) {
        let p1 = pattern[0];
        let p2 = pattern[1];
        let p3 = pattern[2];
        // ab p1, p2, p3 ke andar winCondition ke idx aa chuke
        if (
            boxes[p1].innerText !== "" &&
            boxes[p1].innerText === boxes[p2].innerText &&
            boxes[p2].innerText === boxes[p3].innerText
        ) {
            whoWin = boxes[p1].innerText;
            console.log(`Player ${whoWin} Wins!`);

            // Highlight winning pattern
            boxes[p1].classList.add("winning-box"); // win pr .winning-box class us button pr add honge
            boxes[p2].classList.add("winning-box");
            boxes[p3].classList.add("winning-box");

            freeze(); // stop further moves
            return; // for loop further run nhi hoga

        }
    }
}

// sabhi box ke liye event listener add krna h
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (playerX) {
            box.innerText = "X";
            playerX = false;
        } else {
            box.innerText = "O";
            playerX = true;
        }
        box.disabled = true; // koi button ke el. ko change(overwrite) nhi karege
        checkWinner();

        // Delay popup by 0.5 seconds (500 ms)
        setTimeout(() => {
            whenToPop();
        }, 3600);

    })
})

let whenToPop = () => {
    let toPop = true;
    for (box of boxes) {
        if (!box.disabled) {
            toPop = false;
            break;
        }
    }
    if (toPop) popMethod();
}

let showPopup = () => {
    popOverlay.style.display = "flex";
}

let closePopup = () => {
    popOverlay.style.display = "none";
}

let popMethod = () => {
    if (whoWin == -1) {
        gameStatus.innerText = "Game Draw!"; //🎉 Player ${whoWin} Won! 🎉
        msg.innerText = "It's a tie! Try again.";
        showPopup();
    } else {
        gameStatus.innerText = `🎉 Player ${whoWin} Won! 🎉`; //
        msg.innerText = `Congratulations! Player ${whoWin}`;
        showPopup();
    }
}

playAgainBtn.addEventListener("click", () => {
    closePopup();
    resetGame();
});


/*
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // ...
  });
});

What is box here?

boxes is a NodeList (like an array) of elements.
.forEach is a method that loops over each element in boxes.
For every element in boxes, it calls the function you provide and passes that element as an argument.
The (box) in (box) => { ... } is a parameter — it represents each element being iterated over.
So, box is defined by the forEach method automatically during each iteration.

Think of it like this:

const arr = [10, 20, 30];
arr.forEach((num) => {
  console.log(num); // num is defined here, it takes values 10, then 20, then 30
});
*/