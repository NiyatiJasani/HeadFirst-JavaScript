    var model = {
        boardsize: 7,
        numShips: 3,
        shipLenght: 3,
        shipsSunk: 0,

        // hard-coded values for ship locations
        /*
        	ships: [
        		{ locations: ["06", "16", "26"], hits: ["", "", ""] },
        		{ locations: ["24", "34", "44"], hits: ["", "", ""] },
        		{ locations: ["10", "11", "12"], hits: ["", "", ""] }
        	],
        */

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
            //notify the view that we got a miss at the location in guess
            view.displayMiss(guess);
            view.displayMessage("You missed");
            return false;
        },

        isSunk: function (ship) {
            for (var i = 0; i < this.shipLength; i++) {
                if (ship.hits[i] !== "hit") {
                    return false;
                    //if there's a location that doesn't have a hit, then it's still floating, return false.   
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
                //check to see if loc overlaps
                this.ships[i].locations = locations;
                //assign to model.ships array
            }
            //            console.log("Ships array: ");
            console.log("Ships array: ");
            console.log(this.ships);
        },

        generateShip: function () {
            var direction = Math.floor(Math.random() * 2);
            var row, col;

            if (direction === 1) { // horizontal
                row = Math.floor(Math.random() * this.boardSize);
                col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
                //
                //                console.log(row);
                //                console.log(col);
            } else { // vertical
                row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
                console.log(row);
                col = Math.floor(Math.random() * this.boardSize);
            }


            var newShipLocations = []; //add locations to the new array
            for (var i = 0; i < this.shipLength; i++) {
                //loop for number of locations
                if (direction === 1) {
                    //add location yo array for new horizontal ship
                    newShipLocation.push(row + "" + (col + i));
                    //row is a string we've above , col +i= 01, 02, 03
                } else {
                    //add location to array for vertical ship
                    newShipLocations.push((row + i) + " " + col);
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
            var location = parseGuess(guess); //parse guess to validate players guess
            if (location) {
                this.guesses++;
                //fire method returns true if thr shi is a hit and no.guess increases if it is valid
                var hit = model.fire(location);
                if (hit && model.shipssunk == model.numShips) {
                    view.displayMessage("You sank all my battleships, in" + this.guesses + "guesses");
                }
            }
        }
    }


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




    function handleFireButton() {
        var guessInput = document.getElementById("guessInput");
        var guess = guessInput.value;
        //passing player's guess to the controller
        controller.processGuess(guess);
        guessInput.value = " ";
        //resets form input element to be an empty string
    }

    function handleKeyPress(e) {
        var fireButton = document.getElementById("fireButton");
        e = e || window.event;
        if (e.keyCode === 13) {
            fireButton.click();
            return false;
        }
    }

    window.onload = init;

    function init() {
        var fireButton = document.getElementById("fireButton"); //pre-assigned event handler
        fireButton.onclick = handleFireButton; //click handler function
        var guessInput = document.getElementById("guessInput");
        guessInput.onkeypress = handleKeyPress;

        model.generateShipLocations();
    }