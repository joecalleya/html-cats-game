const modals = () => {

    // Get the modal click's
    var startModal = document.getElementById("startModal");
    var endModal = document.getElementById("endModal");
    var startGame = document.getElementById("startGame")

    // Get the <span> element that closes the modal
    var startSpan = document.getElementsByClassName("startClose")[0];
    var endSpan = document.getElementsByClassName("endClose")[0];
    
    // When the user clicks on <span> (x), close the modal
    startSpan.onclick = () => {startModal.style.display = "none"}
    endSpan.onclick = () => {endModal.style.display = "none"}
    startGame.onclick = () => {startModal.style.display = "none"}

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = (event) => {
        if (event.target == startModal) {
            startModal.style.display = "none";
        }
    }
    window.onclick = (event) => {
        if (event.target == endModal) {
            endModal.style.display = "none";
            }
        }
}
export default modals;