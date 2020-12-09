// create the grid box based on the difficulty - difficultyNumber
const renderGame = (difficultyNumber, gridSelect) => {

    const createHTML = (iterator, pictureNumber) => {
        gridSelect.innerHTML += `<div class="grid__tile" id="grid__tile__${iterator}">
                                    <i class="fas fa-question"></i>
                                     <img class="grid__back__image" src="https://http.cat/${pictureNumber}" alt="${pictureNumber}">
                                </div>  `
    };

    // create array of picture elements, to make it harder
    let htmlCatsAllItems = [100, 101, 102, 200, 201, 202, 204, 206, 207, 300, 301, 302, 303, 304, 305, 307, 400, 401, 402, 403, 404, 405, 406, 408, 409,
        410, 411, 412, 413, 414, 415, 416, 417, 418, 420, 421, 422, 423, 424, 425, 426, 429, 431, 444, 450, 451, 499, 500, 501, 502,
        503, 504, 506, 507, 508, 509, 510, 511, 599
    ]
    // Randomly sort the full list
    htmlCatsAllItems.sort(() => Math.random() - 0.5);
    //Pick number from the array  double it to get both matches.
    let htmlCatsItems = htmlCatsAllItems.splice(0, difficultyNumber);
    htmlCatsItems = htmlCatsItems.concat(htmlCatsItems)
    // sort again to randomize the board
    htmlCatsItems.sort(() => Math.random() - 0.5);
    for (let index = 0; index < htmlCatsItems.length; index++) {
        // render the main grid based on the input array.
        createHTML(index, htmlCatsItems[index]);
    }
}

export default renderGame;