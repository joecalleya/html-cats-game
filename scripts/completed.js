import renderGame from "./renderGame.js"
const gridSelect = document.querySelector(".grid");

const completed = (difficultyNumber) => {
        // activate modal
        let restart = 0;
        endModal.style.display = "block";
        //add event lister to button
        const restartGameEvent = document.getElementById("restartGame");
        restartGameEvent.addEventListener('click', (event) => {
                if (event.target.id == "restartGame")
                {
                restart = 1
                renderGame(difficultyNumber, gridSelect)
                endModal.style.display = "none";
                }
                }) 
        return restart;
};
export default completed;
