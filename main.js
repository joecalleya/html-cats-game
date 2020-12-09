import rotateGrid from "./scripts/rotateGrid.js"
import resetGrid from "./scripts/resetGrid.js"
import checkMatch from "./scripts/checkMatch.js"
import renderGame from "./scripts/renderGame.js"
import modals from "./scripts/modals.js"
import checkIfCompleted from "./scripts/checkIfCompleted.js"

//used to flip tiles
let flipTarget = '';
const isLastClickMatching = false;
//click array with click history
let clickedLocationArray = [];
//clicked result
let clickedImageArray = [];
//matching item count
let matchCount = 0;
// difficulty of the board
let difficultyNumber = 2
// query for the grid items
const gridSelect = document.querySelector(".grid");

// this is the main function, it will essentially track where you click on the grid using the event. values. 
// the reason here is that in order get the parent of the clicked element using the event .next sibbling object.

const click_monitor = () => {
    const clickTarget = event
    const imageClickedURL = clickTarget.target.nextSibling.nextSibling.src;
    const idClickResult = clickTarget.path[1].id;
    clickedImageArray.push(imageClickedURL);
    flipTarget = document.querySelector(`#${idClickResult}`);
    if (idClickResult == 'grid') {
        return;
    } else {
        clickedLocationArray.push(flipTarget);
        //every click - rotate
        rotateGrid(flipTarget)
        // second click - check match
        if (clickedLocationArray.length >= 2) {

            const isLastClickMatching = checkMatch(clickedImageArray, clickedLocationArray)
            if (isLastClickMatching) {
                matchCount++;
            }
            checkIfCompleted(difficultyNumber, matchCount)
            clickedImageArray = [];
            if (clickedLocationArray.length > 2 && isLastClickMatching == false) {
                resetGrid(clickedLocationArray)
                clickedLocationArray = [];
            }
        }
    }
}
renderGame(difficultyNumber, gridSelect)


// main event listener on which the whole game runs

gridSelect.addEventListener('click', (event) => {
    click_monitor();
});

modals()