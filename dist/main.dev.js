"use strict";

var _rotateGrid = _interopRequireDefault(require("./scripts/rotateGrid.js"));

var _resetGrid = _interopRequireDefault(require("./scripts/resetGrid.js"));

var _checkMatch = _interopRequireDefault(require("./scripts/checkMatch.js"));

var _renderGame = _interopRequireDefault(require("./scripts/renderGame.js"));

var _modals = _interopRequireDefault(require("./scripts/modals.js"));

var _completed = _interopRequireDefault(require("./scripts/completed.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//used to flip tiles
var flipTarget = '';
var isLastClickMatching = false; //click array with click history

var clickedLocationArray = []; //clicked result

var clickedImageArray = []; //matching item count

var matchCount = 0; // difficulty of the board

var difficultyNumber = 2; // query for the grid items

var gridSelect = document.querySelector(".grid");
var restart = 0;
(0, _renderGame["default"])(difficultyNumber, gridSelect);
(0, _modals["default"])(); // this is the main function, it will essentially track where you click on the grid using the event. values. 
// the reason here is that in order get the parent of the clicked element using the event .next sibling object.

var click_monitor = function click_monitor() {
  var clickTarget = event;
  var imageClickedURL = clickTarget.target.nextSibling.nextSibling.src;
  var idClickResult = clickTarget.path[1].id;
  clickedImageArray.push(imageClickedURL);
  flipTarget = document.querySelector("#".concat(idClickResult));
  console.log(imageClickedURL, idClickResult, restart);

  if (idClickResult == 'grid') // if click outside images then ignore
    {
      return;
    } else {
    clickedLocationArray.push(flipTarget); //every click - rotate

    (0, _rotateGrid["default"])(flipTarget); // second click - check match

    if (clickedLocationArray.length >= 2) // Second CLick
      {
        var _isLastClickMatching = (0, _checkMatch["default"])(clickedImageArray, clickedLocationArray);

        if (_isLastClickMatching) {
          matchCount++;
        }

        if (difficultyNumber == matchCount) // COMPLETED 
          {
            (0, _completed["default"])(difficultyNumber);
            matchCount == 0;
            difficultyNumber++;
            console.log(restart);
          }

        clickedImageArray = [];

        if (clickedLocationArray.length > 2 && _isLastClickMatching == false) // NOMATCH 
          {
            (0, _resetGrid["default"])(clickedLocationArray);
            clickedLocationArray = [];
          }
      }
  }
}; // main event listener on which the whole game runs


gridSelect.addEventListener('click', function (event) {
  click_monitor();
});