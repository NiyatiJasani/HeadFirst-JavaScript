var model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,

    ships: [
        {
            locations: [0, 0, 0],
            hits: ["", "", ""]
        },
        {
            locations: [0, 0, 0],
            hits: ["", "", ""]
        },
        {
            locations: [0, 0, 0],
            hits: ["", "", ""]
        }
	],

    // original hard-coded values for ship locations
    /*
    	ships: [
    		{ locations: ["06", "16", "26"], hits: ["", "", ""] },
    		{ locations: ["24", "34", "44"], hits: ["", "", ""] },
    		{ locations: ["10", "11", "12"], hits: ["", "", ""] }
    	],
    */

    fire: function (guess) {
        //we iterate through the array of ships, examining one ship at a time   

        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            var index = ship.locations.indexOf(guess);
            if (ship.hits[index] === "hit") {
                view.displayMessage("Oops, you already hit that location!");
                return true;
            } else if (index >= 0) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT!");

                if (this.isSunk(ship)) {
                    view.displayMessage("You sank my battleship!");
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("You missed.");
        return false;
    },

    isSunk: function (ship) {
        for (var i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    },

    generateShipLocations: function () {
        var locations;
        for (var i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShip(i);
            } while (this.collision(locations));
            //check to see if loc overlaps(this.collision(locations));
            this.ships[i].locations = locations; //assign to model.ships array
        }
        console.log("Ships array: ");
        console.log(this.ships);
    },

    generateShip: function () {
        var direction = Math.floor(Math.random() * 2);
        var row, col;

        if (direction === 1) { // horizontal
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
            // console.log(row);
            //console.log(col);
        } else { // vertical
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
            col = Math.floor(Math.random() * this.boardSize);
        }

        var newShipLocations = [];
        for (var i = 0; i < this.shipLength; i++) {
            if (direction === 1) {
                newShipLocations.push(row + "" + (col + i));
            } else {
                newShipLocations.push((row + i) + "" + col);
            }
        }
        return newShipLocations;
    },

    collision: function (locations) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            for (var j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    }

};


var view = {
    displayMessage: function (msg) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },

    displayHit: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },

    displayMiss: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }

};

var controller = {
    guesses: 0,

    processGuess: function (guess) {
        var location = parseGuess(guess);
        //parse guess to validate players guess
        if (location) {
            this.guesses++;
            //fire method returns true if thr shi is a hit and no.guess increases if it is valid
            var hit = model.fir
            var hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
            }
        }
    }
}


// helper function to parse a guess from the user

function parseGuess(guess) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

    if (guess === null || guess.length !== 2) {
        alert("Oops, please enter a letter and a number on the board.");
    } else {
        var firstChar = guess.charAt(0);
        var row = alphabet.indexOf(firstChar);
        var column = guess.charAt(1);

        if (isNaN(row) || isNaN(column)) {
            alert("Oops, that isn't on the board.");
        } else if (row < 0 || row >= model.boardSize ||
            column < 0 || column >= model.boardSize) {
            alert("Oops, that's off the board!");
        } else {
            return row + column;
        }
    }
    return null;
}


// event handlers

function handleFireButton() {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value.toUpperCase();
    //passing player's guess to the controller
    controller.processGuess(guess);
    guessInput.value = "";
    //resets form input element to be an empty string
}

function handleKeyPress(e) {
    var fireButton = document.getElementById("fireButton");

    // in IE9 and earlier, the event object doesn't get passed
    // to the event handler correctly, so we use window.event instead.
    //    e = e || window.event;

    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
}


// init - called when the page has completed loading

window.onload = init;

function init() {
    // Fire! button onclick handler
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;

    // handle "return" key press
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;

    // place the ships on the game board
    model.generateShipLocations();
}

//        model.fire("53");
//        model.fire("06");
//        model.fire("16");
//        model.fire("26");
//        model.fire("34");
//        model.fire("24");
//        model.fire("44");
//        model.fire("12");
//        model.fire("11");
//        model.fire("10");

//    //testing the model
//    view.displayMiss("00"); //"A0"
//    view.displayHit("34"); //"D4"
//    view.displayMiss("55"); //"f5"
//    view.displayHit("12"); //"B2"
//    view.displayMiss("25"); //"C5"
//    view.displayHit("26"); //"C6"
//    console.log(parseGuess("A0"));
//    console.log(parseGuess("B6"));
//    console.log(parseGuess("G3"));
//    console.log(parseGuess("H0"));
//    console.log(parseGuess("A7"));
//
//            controller.processGuess("A0"); // miss
//         controller.processGuess("A6"); // hit
//         controller.processGuess("B6"); // hit
//         controller.processGuess("C6"); // hit
//         controller.processGuess("C4"); // hit
//         controller.processGuess("D4"); // hit
//         controller.processGuess("E4"); // hit
//         controller.processGuess("B0"); // hit
//         controller.processGuess("B1"); // hit
//         controller.processGuess("B2"); // hit
//    view.displayMessage("Tap tap, is this thing on");