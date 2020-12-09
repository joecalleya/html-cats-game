"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// function to check if there is a match amd add to class?>
var checkMatch = function checkMatch(clickedImageArray, clickedLocationArray) {
  // if match
  if (clickedImageArray[0] == clickedImageArray[1]) {
    var isLastClickMatching = true;
    console.log("match", isLastClickMatching);
    clickedLocationArray.forEach(function (clickMatch) {
      clickMatch.className = clickMatch.className.replace(/(?:^|\s)rotate(?!\S)/g, ' match');
    });
    return isLastClickMatching;
  } else {
    var _isLastClickMatching = false;
    return _isLastClickMatching;
  }
};

var _default = checkMatch;
exports["default"] = _default;