//default values

const DEFAULT_COLOR = `#333333`;
const DEFAULT_MODE = `color`;
const DEFAULT_SIZE = 16;

//global values

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

//set functions

function setCurrentColor(newColor) {
    currentColor = newColor;
}

function setCurrentMode(newMode) {
    activateButton(newMode);
    currentMode = newMode;
}

function setCurrentSize(newSize) {
    currentSize = newSize;
}

//DOM cache

const colorPicker = document.getElementById(`colorPicker`);
const colorBtn = document.getElementById(`colorBtn`);
const rainbowBtn = document.getElementById(`rainbowBtn`);
const eraseBtn = document.getElementById(`eraserBtn`);
const clearBtn = document.getElementById(`clearBtn`);
const sizeValue = document.getElementById(`sizeValue`);
const sizeSlider = document.getElementById(`sizeSlider`);
const grid = document.getElementById(`grid`);

//buttons

colorPicker.onchange = (e) => setCurrentColor(e.target.value); //live color
colorBtn.onclick = () => setCurrentMode(`color`); //set to color on click
rainbowBtn.onclick = () => setCurrentMode(`rainbow`); //set to rainbow on click
eraseBtn.onclick = () => setCurrentMode(`erase`); //set to erase on click
clearBtn.onclick = () => reloadGrid(); //reset grid content
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value); //change value live
sizeSlider.onchange = (e) => changeSize(e.target.value) //change grid size

function activateButton(newMode) {
    if (currentMode === 'rainbow') {
      rainbowBtn.classList.remove('active')
    } else if (currentMode === 'color') {
      colorBtn.classList.remove('active')
    } else if (currentMode === 'erase') {
      eraserBtn.classList.remove('active')
    }
  
    if (newMode === 'rainbow') {
      rainbowBtn.classList.add('active')
    } else if (newMode === 'color') {
      colorBtn.classList.add('active')
    } else if (newMode === 'erase') {
      eraserBtn.classList.add('active')
    }
  }

//app functions

function updateSizeValue (value) { //displays value
    sizeValue.innerHTML = `${value} x ${value}`; 
}

function changeSize(value) { //changes grid size
    setCurrentSize(value);
    updateSizeValue(value);
    reloadGrid();
}

function reloadGrid() { //resets grid
    clearGrid();
    setupGrid(currentSize);
}

function clearGrid() { //clears grid
    grid.innerHTML = ``;
}

function setupGrid(size) { //creates the grid
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement(`div`);
        gridElement.addEventListener(`mouseover`, changeColor);
        grid.appendChild(gridElement);
    }
}

function changeColor(e) { //colors on mouse hover
    switch (currentMode) {
        case "rainbow":
            const randomR = Math.floor(Math.random() * 256);
            const randomG = Math.floor(Math.random() * 256);
            const randomB = Math.floor(Math.random() * 256);
            e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
            break;
        case "color":
            e.target.style.backgroundColor = currentColor;
            break;
        case "erase":
            e.target.style.backgroundColor = `#fefefe`;
            break;
    }
}

window.onload = () => {
    setupGrid(DEFAULT_SIZE);
    activateButton(DEFAULT_MODE);
}