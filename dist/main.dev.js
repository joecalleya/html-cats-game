"use strict";

//used to flip tiles
var flipTarget = '';
var isLastClickMatching = false; //click array with click history

var clickedLocationArray = []; //clicked result

var clickedImageArray = []; //matching item count

var matchCount = 0; // difficulty of the board

var difficultyNumber = 6; // query for the grid items

var gridSelect = document.querySelector(".grid"); // MODAL begin and end listener

gridSelect.addEventListener('click', function (event) {
  click_monitor();
}); // Get the modal click's

var startModal = document.getElementById("startModal");
var endModal = document.getElementById("endModal"); // Get the <span> element that closes the modal

var startSpan = document.getElementsByClassName("close")[0]; // When the user clicks on <span> (x), close the modal

startSpan.onclick = function () {
  startModal.style.display = "none";
}; // When the user clicks anywhere outside of the modal, close it


window.onclick = function (event) {
  if (event.target == startModal) {
    startModal.style.display = "none";
  }
}; // FUNCTIONS


var checkIfCompleted = function checkIfCompleted() {
  // check if matches are same number as length of input array and throw modal if done
  if (difficultyNumber == matchCount) {
    // activate modal
    console.log(matchCount);
    endModal.style.display = "block"; //add event lister to button

    var restartGameEvent = document.getElementById("restartGame");
    restartGameEvent.addEventListener('click', function (event) {
      location.reload();
    });
  }
}; // setup rotate function - adds rotate to class if not already on


var rotateGrid = function rotateGrid() {
  if (flipTarget.className.match(/(?:^|\s)rotate(?!\S)/)) {
    flipTarget.className = flipTarget.className.replace(/(?:^|\s)rotate(?!\S)/g, '');
  } else {
    flipTarget.className += " rotate";
  }
}; // setup reset function - loops though clicked items and resets its rotate value


var resetGrid = function resetGrid() {
  clickedLocationArray.forEach(function (tileClick) {
    tileClick.className = tileClick.className.replace(/(?:^|\s)rotate(?!\S)/g, '');
  });
}; // function to check if there is a match amd add to class?>


var checkMatch = function checkMatch() {
  // if match
  if (clickedImageArray[0] == clickedImageArray[1]) {
    isLastClickMatching = true;
    matchCount++;
    clickedLocationArray.forEach(function (clickMatch) {
      clickMatch.className = clickMatch.className.replace(/(?:^|\s)rotate(?!\S)/g, ' match');
    });
  } else {
    isLastClickMatching = false;
  }
};

var click_monitor = function click_monitor() {
  console.log(event); // Get clicked image URL

  var imageClickedURL = event.target.src;
  clickedImageArray.push(imageClickedURL); // first thing is rotate grid and update classes
  // Get clicked ID and create click object

  var idClickResult = event.target.id;
  flipTarget = document.querySelector("#".concat(idClickResult)); //handle grid clicks

  if (idClickResult == 'grid') {
    return;
  } else {
    clickedLocationArray.push(flipTarget); //every click - rotate

    rotateGrid(); // second click - check match

    if (clickedLocationArray.length >= 2) {
      checkMatch();
      checkIfCompleted();
      clickedImageArray = [];

      if (clickedLocationArray.length > 2 && isLastClickMatching == false) {
        resetGrid();
        clickedLocationArray = [];
      }
    }
  }
}; // create the grid box based on the difficulty - difficultyNumber


var createHTML = function createHTML(iterator, pictureNumber) {
  gridSelect.innerHTML += "<div class=\"grid__tile\" id=\"grid__tile__".concat(iterator, "\">\n                             <i class=\"far fa-question-circle\"></i>\n                            <img class=\"grid__back__image\" src=\"https://http.cat/").concat(pictureNumber, "\" alt=\"").concat(pictureNumber, "\">\n                            </div>  ");
}; // create array of picture elements, to make it harder


var htmlCatsAllItems = [100, 101, 102, 200, 201, 202, 204, 206, 207, 300, 301, 302, 303, 304, 305, 307, 400, 401, 402, 403, 404, 405, 406, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 420, 421, 422, 423, 424, 425, 426, 429, 431, 444, 450, 451, 499, 500, 501, 502, 503, 504, 506, 507, 508, 509, 510, 511, 599]; // Randomly sort the full list

htmlCatsAllItems.sort(function () {
  return Math.random() - 0.5;
}); //Pick number from the array  double it to get both matches.

var htmlCatsItems = htmlCatsAllItems.splice(0, difficultyNumber);
htmlCatsItems = htmlCatsItems.concat(htmlCatsItems); // sort again to randomize the board

htmlCatsItems.sort(function () {
  return Math.random() - 0.5;
});

for (var index = 0; index < htmlCatsItems.length; index++) {
  // render the main grid based on the input array.
  createHTML(index, htmlCatsItems[index]);
}