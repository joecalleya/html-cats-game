"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _renderGame = _interopRequireDefault(require("./renderGame.js"));

var _modals = _interopRequireDefault(require("./modals.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var gridSelect = document.querySelector(".grid");

var checkIfCompleted = function checkIfCompleted(difficultyNumber, matchCount) {
  // check if matches are same number as length of input array and throw modal if done
  if (difficultyNumber == matchCount) {
    // activate modal
    endModal.style.display = "block"; //add event lister to button

    var restartGameEvent = document.getElementById("restartGame");
    restartGameEvent.addEventListener('click', function () {
      (0, _renderGame["default"])(10, gridSelect);
      (0, _modals["default"])();
      var matchCount = 0;
    });
  }
};

var _default = checkIfCompleted;
exports["default"] = _default;