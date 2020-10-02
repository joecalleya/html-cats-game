
//used to flip tiles
let flipTarget = '';
let unflip = '';
let lastClickWasMatching = false;
//click array with click history
let clickedLocationArray= [];
//clicked result
let clickedImageArray= [];

//add event listeners to page
const gridSelect = document.querySelector(".grid");

// FUNCTIONS

    // setup rotate function - adds rotate to class if not already on

const rotateGrid = () => {
    if (flipTarget.className.match(/(?:^|\s)rotate(?!\S)/)) 
        {
            flipTarget.className = flipTarget.className.replace(/(?:^|\s)rotate(?!\S)/g, '');
        }
    else {
        flipTarget.className += " rotate"
        }

    };

// setup reset function - loops though clicked items and resets its rotate value
const resetGrid = () => {
    clickedLocationArray.forEach(tileClick => {   
                                                tileClick.className = tileClick.className.replace(/(?:^|\s)rotate(?!\S)/g, '');
    });
    // console.log("resetting",clickedLocationArray,clickedLocationArray.length);

                        }
// function to chekc if there is a match amd add to class?>

const checkMatch = () => {  

    // if match
        if (clickedImageArray[0] == clickedImageArray[1])
    {
        lastClickWasMatching = true;
        // console.log("checking match",clickedImageArray,lastClickWasMatching);
        clickedLocationArray.forEach(clickMatch => {clickMatch.className = clickMatch.className.replace(/(?:^|\s)rotate(?!\S)/g, ' match'); console.log(clickMatch)});
    }
    else
    {
        lastClickWasMatching = false;
        // console.log("checking match",clickedImageArray,lastClickWasMatching);
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
        if (idClickResult == 'grid')
             {console.log("accidental")
             return;}
        else
            {
            clickedLocationArray.push(flipTarget);
            //every click - rotate
            rotateGrid()
            console.log("Rotating","clicks:",clickedLocationArray.length,clickedImageArray);

            // second click - check match
            if (clickedLocationArray.length >= 2)
                {
                checkMatch()
                console.log("checking match","clicks:",clickedLocationArray.length,clickedImageArray,lastClickWasMatching);
                clickedImageArray = [];
                if (clickedLocationArray.length > 2 && lastClickWasMatching == false)
                {
                    resetGrid()
                    clickedLocationArray = [];
                    console.log("resetting","clicks:",clickedLocationArray.length);
                }
                }
                
            }
    }
const createHTML = (iterator,pictureNumber) => {
    // gridSelect.innerHTML = ``
    gridSelect.innerHTML += `<div class="grid__tile" id="grid__tile__${iterator}">
                            <img class="grid__image" src="https://http.cat/${pictureNumber}" alt="${pictureNumber}">
                            </div>  `
};


// create array of picture elements, each one must be on twice
let arrayForHtml = [100,100,101,101,200,200,201,201,202,202,204,204]
// Randomly sort it
arrayForHtml.sort(() => Math.random() - 0.5);
for (let index = 0; index < arrayForHtml.length; index++) {
    createHTML(index,arrayForHtml[index])
        ;
        
    }

        
// setup listener
gridSelect.addEventListener('click', (event) => {
                                            click_monitor();
                                            });
