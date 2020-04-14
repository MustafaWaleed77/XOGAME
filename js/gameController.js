import {createXBlock, creatOBlock} from "./gridGenaroter.js";
import {creatGrid} from "./gridGenaroter.js";
import * as Constants from "./constants.js";

let empty, xTurn, winner, checkGrid;

let initGame = () => {
    empty = 9;
    xTurn = true;
    winner = "";
    checkGrid = createCheckGrid();
}
let blockClicked = () => {
    const block = event.target;
    const id = block.getAttribute("id");
    const r = parseInt(id.split("_")[1]) + 1;
    const c = parseInt(id.split("_")[2]) + 1;
    if (checkGrid[r][c] != -1) return;
    checkGrid[r][c] = xTurn ? 0 : 1;
    const newBlock = xTurn ? createXBlock(id.substr(2)) : creatOBlock(id.substr(2));
    block.replaceWith(newBlock);
    empty -= 1;
    changeTurn();
    checkForWin();
};


let changeTurn = () => {
    xTurn = !xTurn;
    const turnElement = document.getElementById("turn");
    let turn = xTurn ? "X" : "O";
    turnElement.innerText = `${turn} TURN`;
};


let checkForWin = () => {
    for (let i = 1; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            for (let k = 0; k < 4; k++) {
                const rMove = Constants.R_Moves[k];
                const cMove = Constants.C_Moves[k];
                const cell1 = checkGrid[i + rMove][j + cMove];
                const cell2 = checkGrid[i][j];
                const cell3 = checkGrid[i + (rMove * -1)][j + (cMove * -1)];
                if(cell1 === -1 || cell2 === -1 || cell3 === -1) continue;
                if (cell1 === cell2 && cell2 === cell3) {
                    winner = cell1 === 0 ? "X" : "O";
                    showOverlay(winner);
                }
            }
        }
    }
    if (empty == 0) {
        showOverlay("DRAW");
    }
};

let resetGame = () => {
    document.getElementById("overlay").style.display = "none";
    initGame();
    creatGrid();
};

let createCheckGrid = () => {
    let arr = [];
    for (let i = 0; i < 5; i++) {
        if (!arr[i]) arr[i] = [];
        for (let j = 0; j < 5; j++) {
            arr[i].push(-1);
        }
    }
    return arr;
}
window.hideOverlay = () => {
    resetGame();
}
window.showOverlay = (winner) => {
    if (winner === "DRAW") {
        document.getElementById("overlay-text").innerHTML = `DRAW CLICK TO PLAY AGAIN`;
    } else {
        document.getElementById("overlay-text").innerHTML = `${winner} WON CLICK TO PLAY AGAIN`;
    }
    document.getElementById("overlay").style.display = "block";
}

initGame();
export {blockClicked}
