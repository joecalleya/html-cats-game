import rotateGrid from "./scripts/rotateGrid.js"
import resetGrid from "./scripts/resetGrid.js"
import checkMatch from "./scripts/checkMatch.js"
import renderGame from "./scripts/renderGame.js"
import modals from "./scripts/modals.js"
import completed from "./scripts/completed.js"

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
let restart = 0;

renderGame(difficultyNumber, gridSelect)
modals()
// this is the main function, it will essentially track where you click on the grid using the event. values. 
// the reason here is that in order get the parent of the clicked element using the event .next sibling object.


const click_monitor = () => {
    const clickTarget = event
    const imageClickedURL = clickTarget.target.nextSibling.nextSibling.src;
    const idClickResult = clickTarget.path[1].id;
    console.log("IMGClicked:",imageClickedURL,"clickedID:",idClickResult, "Matches:", matchCount)

    if (idClickResult == 'grid' || !idClickResult)  // if click outside images then ignore
    {
        return;
    } else {
        clickedImageArray.push(imageClickedURL);
        flipTarget = document.querySelector(`#${idClickResult}`);
        clickedLocationArray.push(flipTarget);
        //every click - rotate
        rotateGrid(flipTarget)
        // second click - check match
        if (clickedLocationArray.length >= 2)  // Second CLick
            {
            const isLastClickMatching = checkMatch(clickedImageArray, clickedLocationArray)
            if (isLastClickMatching) 
            {
                matchCount++;
            }
            if (difficultyNumber == matchCount) // COMPLETED 
            {
                matchCount =  0;
                difficultyNumber ++;
                completed(difficultyNumber)

                // if (restart = 1) restart();
            }
            clickedImageArray = [];
            if (clickedLocationArray.length > 2 && isLastClickMatching == false) // NOMATCH 
            {
                resetGrid(clickedLocationArray)
                clickedLocationArray = [];
            }
        }
    }
}
// main event listener on which the whole game runs
gridSelect.addEventListener('click', (event) => {
    click_monitor();
});



