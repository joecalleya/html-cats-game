
const checkIfCompleted = (difficultyNumber,matchCount) => {
    // check if matches are same number as length of input array and throw modal if done
    if (difficultyNumber == matchCount) {
        // activate modal
        endModal.style.display = "block";
        //add event lister to button
        const restartGameEvent = document.getElementById("restartGame");
        restartGameEvent.addEventListener('click', (event) => {

            location.reload();
        });
    }
};

export default checkIfCompleted;