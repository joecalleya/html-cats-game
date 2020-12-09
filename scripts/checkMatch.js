
// function to check if there is a match amd add to class?>

const checkMatch = (clickedImageArray,clickedLocationArray) => {
    // if match
    if (clickedImageArray[0] == clickedImageArray[1]) {

        clickedLocationArray.forEach(clickMatch => {
            clickMatch.className = clickMatch.className.replace(/(?:^|\s)rotate(?!\S)/g, ' match');
        });
    }
    return (clickedImageArray[0] == clickedImageArray[1]);

}

export default checkMatch;