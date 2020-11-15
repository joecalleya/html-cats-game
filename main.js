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
// dificulty of the board
let difficultyNumber = 6

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

// FUNCTIONS

const checkIfCompleted = () => {
    // check if matches are same number as length of input array and threow modal if done
    if (difficultyNumber == matchCount) {
        // activate modal
        console.log(matchCount)
        endmodal.style.display = "block";
        //add envent lister to button
        const restartGameEvent = document.getElementById("restartGame");
        restartGameEvent.addEventListener('click', (event) => {
            
            location.reload();
        });
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
        matchCount++;
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
            checkIfCompleted()
            clickedImageArray = [];
            if (clickedLocationArray.length > 2 && isLastClickMatching == false) {
                resetGrid()
                clickedLocationArray = [];
            }
        }

    }
}

// create the grid box based on the difficulty - difficultyNumber

const createHTML = (iterator, pictureNumber) => {
    gridSelect.innerHTML += `<div class="grid__tile" id="grid__tile__${iterator}">
                            <img class="grid__image" src="https://http.cat/${pictureNumber}" alt="${pictureNumber}">
                            </div>  `
};
// create array of picture elements, to make it harder
let htmlCatsAllItems = [100, 101, 102, 200, 201, 202, 204, 206, 207, 300, 301, 302, 303, 304, 305, 307, 400, 401, 402, 403, 404, 405, 406, 408, 409,
    410, 411, 412, 413, 414, 415, 416, 417, 418, 420, 421, 422, 423, 424, 425, 426, 429, 431, 444, 450, 451, 499, 500, 501, 502,
    503, 504, 506, 507, 508, 509, 510, 511, 599
]
// Randomly sort the full list
htmlCatsAllItems.sort(() => Math.random() - 0.5);
//Pick numbr from the array  double it to get both matches.
let htmlCatsItems = htmlCatsAllItems.splice(0, difficultyNumber);
htmlCatsItems = htmlCatsItems.concat(htmlCatsItems)
// sort again to ranomise the booard
htmlCatsItems.sort(() => Math.random() - 0.5);
for (let index = 0; index < htmlCatsItems.length; index++) {
    // render the main grid bsed on the input array.
    createHTML(index, htmlCatsItems[index]);
}