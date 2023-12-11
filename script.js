
const myGrid = document.getElementById('grid')
const rainbowColor = generateRainbowColor();
let currentMode = 0;
let inputGridSize = 16;
let originalBtnRainbowText = "Rainbow mode !"
let r = 255
let g = 255
let b = 255
let steps = 255/10
let stepsRemaining = 10;

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
    let caseOfGrid = document.createElement('div')
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

myGrid.addEventListener("mouseover", function(event) {
    if ( isMouseDown && event.target.classList.contains('case')){
        if ( currentMode === 0){
        event.target.style.backgroundColor= "darkslategray";}
        else if ( currentMode === 1){
        event.target.style.backgroundColor= generateRainbowColor();
            }
        else if (currentMode === 2) {
        event.target.style.backgroundColor = incrementColor();
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
        prompt("Choose a correct size, must be a number, between 1 and 100.")
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
btnColor.addEventListener("click", switchRainbowLed)

function switchRainbowLed () {
    currentMode = 0;
    btnRainbow.innerHTML = originalBtnRainbowText;
    btnRainbow.classList.add('buttons')
    btnRainbow.classList.remove('top-round-rainbow')
    header.style.backgroundColor = "linen";
}


// User menu - Button Rainbow mode

const btnRainbow = document.createElement('button')
    btnRainbow.textContent ="Rainbow mode !"
    btnRainbow.classList.add('buttons')
    btnRainbow.id = "btnRainbow"
    
document.getElementById('usermenu').appendChild(btnRainbow);
btnRainbow.addEventListener("click", toggleRainbowMode)


// switch currentmode for correct choice in Hover
function toggleRainbowMode () {

    currentMode = 1;
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

// User menu - Gradiant button

const btnGradiant = document.createElement('button')
    btnGradiant.textContent="Fade to black !"
    btnGradiant.classList.add('buttons')
    btnGradiant.id="btnGradiant"

document.getElementById('usermenu').appendChild(btnGradiant)
btnGradiant.addEventListener("click", switchGradiantMode );

// Reset r, g, b, steps and stepsRemaining to be sure of good fonctionnement of incrementColor function if already used
function switchGradiantMode() {
    currentMode = 2;
    document.getElementById('btnGradiant').style.background = 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(255,255,255,1) 100%)';
    resetGradientState();
}

function resetGradientState() {
    r = 255;
    g = 255;
    b = 255;
    steps = 255 / 10;
    stepsRemaining = 10;
    uppingDowning = 1;
}

let uppingDowning = 1;
function incrementColor () {

if ( uppingDowning === 1){
    r = Math.max(0, Math.round(r - steps));
    g = Math.max(0, Math.round(g - steps));
    b = Math.max(0, Math.round(b - steps));

    const hexColor = rgbToHex(r, g, b)
    stepsRemaining--;
    if ( stepsRemaining === 0 ) {
        uppingDowning = 0;
    }
    console.log(`Je réduis r g b jusqu'à 0 : ${r}   ${g}   ${b}`);
    console.log(`La valeur de stepsRemaining est de ${stepsRemaining}`)
    return hexColor

    

}

else if ( uppingDowning === 0) {
    steps = 255/10
        r = Math.min(255, Math.round(r + steps));
        g = Math.min(255, Math.round(g + steps));
        b = Math.min(255, Math.round(b + steps));

        const hexColor = rgbToHex(r, g, b)
        stepsRemaining++;
        if ( stepsRemaining === 10) {
            uppingDowning = 1;
        }
        console.log(`J'augmente r g b jusqu'à 255 : ${r}   ${g}   ${b}`);
        console.log(`La valeur de stepsRemaining est de ${stepsRemaining}`)
        return hexColor
       
    }
}

// Function to convert RGB to HEX

function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  function rgbToHex(r, g, b) {
    const hexR = componentToHex(r);
    const hexG = componentToHex(g);
    const hexB = componentToHex(b);

    return `#${hexR}${hexG}${hexB}`;
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





