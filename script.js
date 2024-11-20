const board = document.getElementById("board")

let rows = 16;
let columns = 16;

function updateSquaresWidth(columns) {
    document.documentElement.style.setProperty('--flex-item-width', `${100/columns}%`)
}

function createSquares(rows, columns = rows) {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            const square = document.createElement("div")
            square.classList.add("board-square")
            square.id = `row:${r+1}+column:${c+1}`
            board.append(square)
        }
    }
}

function randomRGB() {
    const R = Math.floor((Math.random() * 256));
    const G = Math.floor((Math.random() * 256));
    const B = Math.floor((Math.random() * 256));
    return [R, G, B];
}

updateSquaresWidth(columns)
createSquares(rows)

board.addEventListener("mouseover", (e) => {
    if (e.target.id === "board") return;
    console.log("yes");
    const target = document.getElementById(e.target.id);
    rgb = randomRGB();
    target.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
})