const myGrid = document.getElementById('grid')
let inputGridSize = 0;


// Creating a grid by a loop
function creatingGrid () {
for (let x=0; x < inputGridSize; x++) {
    var caseOfGrid = document.createElement('div')
    caseOfGrid.className = "case case-size"
    document.getElementById('grid').appendChild(caseOfGrid);
}
}


// Hover for individual case

myGrid.addEventListener("mouseover", function(event) {
    if (event.target.classList.contains('case')){
        event.target.style.backgroundColor="red";
    }
});

myGrid.addEventListener("mouseout", function(event) {
    if (event.target.classList.contains('case')){
        event.target.style.backgroundColor="white";
    }
});

// User menu - Button grid size

const btnSizeGrid = document.createElement('button')
    btnSizeGrid.textContent = "Change grid size !"
    btnSizeGrid.id = "btnSizeGrid"
document.getElementById('usermenu').appendChild(btnSizeGrid)

btnSizeGrid.addEventListener("click", changeGridSize)

function changeGridSize () {
   inputGridSize = prompt("Choose your grid size ! Should be a maximum of 100.")
    if ( inputGridSize > 100 || inputGridSize < 0 ){
        prompt("Choose a correct size")
    }
    else {
        alert("OKAY.")
        creatingGrid();
        return inputGridSize;
        
    }

}

