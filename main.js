//used to flip tiles
let flipTarget = '';
let unflip = '';
let isLastClickMatching = false;
//click array with click history
let clickedLocationArray = [];
//clicked result
let clickedImageArray = [];
//matching item count
let matchCount = 0;

// query for the grid items
const gridSelect = document.querySelector(".grid");
// MODAL beginn and end listener
gridSelect.addEventListener('click', (event) => {
    click_monitor();
});
// Get the modal clciks
var startmodal = document.getElementById("startModal");
var endmodal = document.getElementById("endModal");

// Get the <span> element that closes the modal
var startSpan = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
startSpan.onclick = function () {
    startmodal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == startmodal) {
        startmodal.style.display = "none";
    }
}
// modalEventListenerSetup("endModal","none")


// FUNCTIONS
function refreshPage(){
    const refresh = document.querySelector(".refresh");
    refresh.addEventListener('click', (event) => {
        location.reload;
    });
} 
const checkIfCompleted = ()  => {
    // check if matches are same number as length of input array and threow modal if done
    if ((htmlCatsItems.length/2) == matchCount || matchCount ==1) 
    {
        // activate modal
        console.log(matchCount)
        endmodal.style.display = "block";
    }
    };
// setup rotate function - adds rotate to class if not already on

const rotateGrid = () => {
    if (flipTarget.className.match(/(?:^|\s)rotate(?!\S)/)) {
        flipTarget.className = flipTarget.className.replace(/(?:^|\s)rotate(?!\S)/g, '');
    } else {
        flipTarget.className += " rotate"
    }

};

// setup reset function - loops though clicked items and resets its rotate value
const resetGrid = () => {
    clickedLocationArray.forEach(tileClick => {
        tileClick.className = tileClick.className.replace(/(?:^|\s)rotate(?!\S)/g, '');
    });

}
// function to chekc if there is a match amd add to class?>

const checkMatch = () => {

    // if match
    if (clickedImageArray[0] == clickedImageArray[1]) {
        isLastClickMatching = true;
        matchCount ++;
        clickedLocationArray.forEach(clickMatch => {
            clickMatch.className = clickMatch.className.replace(/(?:^|\s)rotate(?!\S)/g, ' match');
        });
    } else {
        isLastClickMatching = false;
    }
}

const click_monitor = () => {

    // Get clicked image URL
    let imageClickedURL = event.target.children[0].src;
    clickedImageArray.push(imageClickedURL);
    // first thing is rotate grid and update cdlasses
    // Get clicked ID and create click object
    let idClickResult = event.target.id;
    flipTarget = document.querySelector(`#${idClickResult}`);
    //handle grid clicks
    if (idClickResult == 'grid') {
        return;
    } else {
        clickedLocationArray.push(flipTarget);
        //every click - rotate
        rotateGrid()
        // second click - check match
        if (clickedLocationArray.length >= 2) {
            checkMatch()
            console.log(matchCount)
            checkIfCompleted()
            clickedImageArray = [];
            if (clickedLocationArray.length > 2 && isLastClickMatching == false) {
                resetGrid()
                clickedLocationArray = [];
            }
        }

    }
}
const createHTML = (iterator, pictureNumber) => {
    gridSelect.innerHTML += `<div class="grid__tile" id="grid__tile__${iterator}">
                            <img class="grid__image" src="https://http.cat/${pictureNumber}" alt="${pictureNumber}">
                            </div>  `
};
// create array of picture elements, each one must be on twice
let htmlCatsItems = [100, 100, 101, 101, 200, 200, 201, 201, 202, 202, 204, 204]
// Randomly sort it
htmlCatsItems.sort(() => Math.random() - 0.5);
for (let index = 0; index < htmlCatsItems.length; index++) {
    // render the main grid
    createHTML(index, htmlCatsItems[index]);
}
