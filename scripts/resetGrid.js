// setup reset function - loops though clicked items and resets its rotate value
const resetGrid = (clickedLocationArray) => {
    clickedLocationArray.forEach(tileClick => {
        tileClick.className = tileClick.className.replace(/(?:^|\s)rotate(?!\S)/g, '');
    });

}

export default resetGrid;