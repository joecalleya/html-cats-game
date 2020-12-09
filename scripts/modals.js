const modals = () => {

    // Get the modal click's
    var startModal = document.getElementById("startModal");
    var endModal = document.getElementById("endModal");
    // Get the <span> element that closes the modal
    var startSpan = document.getElementsByClassName("close")[0];


    // When the user clicks on <span> (x), close the modal
    startSpan.onclick = function () {
        startModal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == startModal) {
            startModal.style.display = "none";
        }
    }
}
export default modals;