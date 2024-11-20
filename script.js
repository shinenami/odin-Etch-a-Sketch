const board = document.getElementById("board")

let rows = 32;
let columns = 32;

function updateSquareWidth (columns) {
    document.documentElement.style.setProperty('--flex-item-width', `${100/columns}%`)
}

function createSquares(rows, columns = rows) {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            const square = document.createElement("div")
            square.classList.add("board-square")
            square.classList.add(`row:${r+1}`)
            square.classList.add(`column:${c+1}`)
            board.append(square)
        }
    }
}

updateSquareWidth(columns)
createSquares(rows)
