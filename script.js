const board = document.getElementById("board")
const body = document.querySelector("body")
const inputSize = document.createElement("div")
const tooltip = document.createElement("div")
tooltip.id = "sliderTooltip"
inputSize.id = "inputSize"
const inputSizeField = inputSize.appendChild(document.createElement("input"))
Object.assign(inputSizeField, {
    type : "range",
    // placeholder : "Input size",
    min : 1,
    max : 128,
    value : 6,
    // title : `Grid Size`,
    oninput : function () {
        updateSliderTooltip(this)
    }
})
const inputSizeButton = inputSize.appendChild(document.createElement("button"))
inputSizeButton.textContent = "Set"
inputSize.appendChild(tooltip)
body.insertBefore(inputSize, board);
// body.insertBefore(tooltip, board)


let rows = 8;
let columns = 8;

function updateSliderTooltip(slider) {
    const sliderRect = slider.getBoundingClientRect()
    const tooltipPosition = ((slider.value - slider.min) / (slider.max - slider.min)) * sliderRect.width

    tooltip.textContent = slider.value

    tooltip.style.left = `${tooltipPosition + sliderRect.left - sliderRect.width * 0}px`
    tooltip.style.top = `${sliderRect.top + 36}px`
    // tooltip.style.visibility = `visible`;
}

inputSizeField.addEventListener('blur', () => { tooltip.style.visibility = 'hidden';})
inputSizeField.addEventListener('mouseleave', () => { tooltip.style.visibility = 'hidden'; });
inputSizeField.addEventListener('mouseenter', () => { updateSliderTooltip(inputSizeField); tooltip.style.visibility = 'visible'; });

function updateSquaresWidth(columns) {
    document.documentElement.style.setProperty('--flex-item-width', `${100/columns}%`)
}


async function createSquares(rows, columns = rows) {
    const fragment = document.createDocumentFragment()
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            const square = document.createElement("div")
            Object.assign(square, {
                classList: "board-square",
                // id: `row:${r+1}+column:${c+1}`,
                draggable: false,
                style: `opacity: 0.1`
            })
            
            // rgb = randomRGB();
            // square.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
            // board.appendChild(square)
            fragment.appendChild(square)
            // await sleep(0.1)
        }
    }
    board.append(fragment);
}

function sleep(ms) { 
    return new Promise(resolve => setTimeout(resolve, ms)); 
}

function randomRGB() { 
    const getRandomValue = () => 80 + Math.floor(Math.random() * 156); 
    return [getRandomValue(), getRandomValue(), getRandomValue()]; 
}

function updateGrid(rows) {
    board.innerHTML = ""
    updateSquaresWidth(rows)
    createSquares(rows)
}

let isMouseDown = false;

document.addEventListener("mousedown", () => {
    isMouseDown = true;
})

document.addEventListener("mouseup", () => {
    isMouseDown = false;
})

let isRGB = false;


function colorize(e) {
    if (e.target.id === "board") return;
    let opacity = e.target.style.opacity;
    const isColored = e.target.classList.contains("colored");
    if (isColored && opacity === 1) return;

    if (isMouseDown) {
        switch (isRGB) {
            case true:
                rgb = randomRGB();
                e.target.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
            default:
                e.target.style.backgroundColor = `red`
        }
        
        e.target.classList.add("colored")
        opacity = parseFloat(opacity) + 0.1;
        e.target.style.opacity = opacity;        

    }
}

board.addEventListener("mouseover", colorize)
board.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    colorize(e)
})

inputSizeButton.addEventListener("click", () => {
    updateGrid(inputSizeField.value)
})

inputSizeButton.dispatchEvent(new Event('click'))
// setInterval(() => { updateGrid(Math.floor(Math.random() * 128)) }, 10) //shizo