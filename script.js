
const myGrid = document.getElementById('grid')
const rainbowColor = generateRainbowColor();
let currentMode = 0;
let inputGridSize = 16;
let originalBtnRainbowText = "Rainbow mode !"

// Body parts
const body = document.getElementById('body')
body.style.backgroundColor = "#100a33"


// Bottom parts
const bottom = document.getElementById('bottom')
bottom.style.paddingTop = "128px"


// Header parts
const header = document.createElement('header')
header.textContent = "Etch-a-Sketch !"
header.style.backgroundColor = "linen";
header.style.paddingTop = "16px";
header.style.paddingBottom = "16px";
header.style.borderBottom = "10px solid"
header.style.borderColor = "#8a667a"
header.style.display = "flex";
header.style.justifyContent = "center"
header.style.paddingLeft = "32px"
header.style.fontSize ="32px"
header.style.fontWeight = "bold"
header.style.fontFamily = "Roboto, sans-serif"
header.style.color ="thistle"

header.id = "header"
document.body.insertBefore(header, document.body.firstChild);


// Creating a grid by a loop, gonna make perfect grid with .case properties in css
function creatingGrid () {
    myGrid.innerHTML = "";
for (let x=0; x < inputGridSize * inputGridSize; x++) {
    var caseOfGrid = document.createElement('div')
    caseOfGrid.className = "case";
    myGrid.appendChild(caseOfGrid)
}

}

creatingGrid();



// Hover for individual case

let isMouseDown = false;

myGrid.addEventListener('mousedown', function() {
    isMouseDown = true;
});

document.addEventListener('mouseup', function() {
    isMouseDown = false;
});

myGrid.addEventListener("mousemove", function(event) {
    if ( isMouseDown && event.target.classList.contains('case')){
        if ( currentMode === 0){
        event.target.style.backgroundColor= "darkslategray";}
        else if ( currentMode === 1){
        event.target.style.backgroundColor= generateRainbowColor();
            }
        }
    }
);



// User menu - Button grid size

const btnSizeGrid = document.createElement('button')
    btnSizeGrid.textContent = "Change grid size !"
    btnSizeGrid.id = "btnSizeGrid"
    btnSizeGrid.classList.add ("buttons")
document.getElementById('usermenu').appendChild(btnSizeGrid)

btnSizeGrid.addEventListener("click", changeGridSize)


function changeGridSize () {
   inputGridSize = parseInt(prompt("Choose your grid size ! Should be a maximum of 100."));
    if ( isNaN(inputGridSize) || inputGridSize > 100 || inputGridSize < 0 ){
        prompt("Choose a correct size.")
    }
    else {
        document.documentElement.style.setProperty('--inputUserSize', inputGridSize)
        alert("Updated.");
        creatingGrid();
        
    }

}


// User menu - Color mode

const btnColor = document.createElement('button')
    btnColor.textContent = "Color mode !"
    btnColor.id = 'btnColor'
    btnColor.classList.add ("buttons")
document.getElementById('usermenu').appendChild(btnColor);
btnColor.addEventListener("click", switchRainbowButton)

function switchRainbowButton () {
    currentMode = 0;
    btnRainbow.innerHTML = originalBtnRainbowText;
    header.style.backgroundColor = "linen";
}


// User menu - Button Rainbow mode

const btnRainbow = document.createElement('button')
    btnRainbow.textContent ="Rainbow mode !"
    btnRainbow.classList.add('buttons')
    btnRainbow.id = "btnRainbow"
    
document.getElementById('usermenu').appendChild(btnRainbow);
btnRainbow.addEventListener("click", toggleRainbowMode)
btnRainbow.addEventListener("click", toggleRainbowLed)

function toggleRainbowMode () {

    currentMode = 1;
}

function toggleRainbowLed () {
    if ( currentMode === 1) {
        const btnRainbow = document.getElementById('btnRainbow')
        const rainbowText = btnRainbow.textContent
        let coloredText= ``;
        for ( let i = 0; i < rainbowText.length; i++){
            const coloredLetter = `<span style="color: ${generateRainbowColor()}">${rainbowText[i]}</span>`;
            coloredText += coloredLetter;
        }
        btnRainbow.innerHTML = coloredText;
        btnRainbow.classList.remove('buttons')
        btnRainbow.classList.add('top-round-rainbow')
        header.style.backgroundColor = generateRainbowColor();

        
    }
    else if ( currentMode === 0) {
        btnRainbow.innerHTML = originalBtnRainbowText;
        header.style.backgroundColor = "linen";
        
    }
}

// User menu - Gradiant button

const btnGradiant = document.createElement('button')
    btnGradiant.textContent="Fade to black !"
    btnGradiant.classList.add('buttons')
    btnGradiant.id="btnGradiant"

document.getElementById('usermenu').appendChild(btnGradiant)
btnGradiant.addEventListener('click', incrementColor)

function incrementColor(color, steps) {
    const stepSize = 255 / steps;
    const r = Math.min(color.r + stepSize, 255);
    const g = Math.min(color.g + stepSize, 255);
    const b = Math.min(color.b + stepSize, 255);

    return { r, g, b };
}

// User menu - Button reset 

const btnReset = document.createElement('button')
    btnReset.textContent="Reset content !"
    btnReset.classList.add('buttons')
    btnReset.id='btnReset'

document.getElementById('usermenu').appendChild(btnReset)
btnReset.addEventListener("click", resetfunc)

function resetfunc () {
    const cases = document.querySelectorAll('.case');
    cases.forEach(caseElement => {
        caseElement.style.backgroundColor ="linen";
    });

}


function generateRainbowColor () {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return "#" + randomColor;
    
}





