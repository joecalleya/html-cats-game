// setup rotate function - adds rotate to class if not already on
const rotateGrid = (flipTarget) => {
    if (flipTarget.className.match(/(?:^|\s)rotate(?!\S)/)) {
        flipTarget.className = flipTarget.className.replace(/(?:^|\s)rotate(?!\S)/g, '');
    } else {
        flipTarget.className += " rotate"
    }

};
export default rotateGrid;