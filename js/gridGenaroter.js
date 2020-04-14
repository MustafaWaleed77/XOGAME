import * as Constants from "./constants.js";
import {blockClicked} from "./gameController.js";

let creatGrid = () => {
    setGridHeightWidth();
    appendBlocksToGrid();
};
let setGridHeightWidth = () => {
    const grid = getGrid();
    grid.style.height = Constants.HEIGHT + "px";
    grid.style.width = Constants.WIDTH + "px";
};


let appendBlocksToGrid = () => {
    const grid = getGrid();
    grid.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const gridRow = createGridRow();
        for (let j = 0; j < 3; j++) {
            gridRow.append(createBlock(`e_${i}_${j}`));
        }
        grid.append(gridRow);
    }
};

let createBlock = (id) => {
    const block = document.createElement("div");
    block.classList.add("grid_block");
    block.setAttribute("id", id);
    block.addEventListener("click", blockClicked);
    return block;
};

let createGridRow = () => {
    const gridRow = document.createElement("div");
    gridRow.classList.add("grid_row");
    return gridRow;
};


let getGrid = () => {
    return document.getElementById(Constants.GRID_ID);
};


let createXBlock = (id) => {
    const x = createBlock(`x_${id}`);
    let diagonalLineClassList = ["line", "line_diagonal"];
    let diagonalLine = document.createElement("div");
    diagonalLine.classList.add(...diagonalLineClassList);
    let diagonalLineReverseClassList = ["line", "line_diagonal_reverse"];
    let diagonalLineReverse = document.createElement("div");
    diagonalLineReverse.classList.add(...diagonalLineReverseClassList);
    x.append(diagonalLine);
    x.append(diagonalLineReverse);
    return x;
}

let creatOBlock = (id) => {
    const o = createBlock(`o_${id}`);
    let circleClassList = ["circle_base"];
    let circle = document.createElement("div");
    circle.classList.add(...circleClassList);
    o.append(circle);
    return o;
}


export {creatGrid, createXBlock, creatOBlock};
