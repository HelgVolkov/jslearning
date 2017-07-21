'use strict';

var view = {
	displayMessage: function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},
	displayMiss: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
	},
	displayHit: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "hit");
	}
};

var model = {
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipSunk: 0,
	ships: [
		{ locations: ["0", "0", "0"], hits: ["", "", ""] },
		{ locations: ["0", "0", "0"], hits: ["", "", ""] },
		{ locations: ["0", "0", "0"], hits: ["", "", ""] }
	],
	fire: function(guess) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess);

			if(index >= 0) {
				ship.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("Попал!");

				if(this.isSunk(ship)) {
					view.displayMessage("Потопил!");
					this.shipSunk++;
				}

				return true;
			}
		}

		view.displayMiss(guess);
		view.displayMessage("Промах!");
		return false;
	},
	isSunk: function(ship) {
		for (var i = 0; i < this.shipLength; i++) {
			if(ship.hits[i] !== "hit") {
				return false;
			}
		}
		return true;
	},
	generateShipLocations: function() {
		var locations;
		for(var i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip();
			} while (this.collision(locations)) {
				this.ships[i].locations = locations;
			}
		}
	},
	generateShip: function() {
		var direction = Math.floor(Math.random() * 2);
		var row, col;

		if(direction === 1) {
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
		} else {
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
			col = Math.floor(Math.random() * this.boardSize);
		}

		var newShipLocations = [];

		for (var i = 0; i < this.shipLength; i++) {
			if(direction === 1) {
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col);
			}
		}

		return newShipLocations;
	},
	collision: function(locations) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = model.ships[i];

			for (var j = 0; j < locations.length; j++) {
				if(ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	}

};

var controller = {
	guesses: 0,
	processGuess: function(guess) {
		var location = parseGuess(guess);

		if(location) {
			this.guesses++;

			var hit = model.fire(location);
			if(hit && model.shipSunk === model.numShips) {
				view.displayMessage("Все корабли потоплены за " + this.guesses + " попыток");
			}
			//console.log(model.shipSunk + ' | ' + model.numShips);
		}
	}
};

function parseGuess(guess) {
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

	if(guess === null || guess.length !== 2) {
		view.displayMessage("Неверный формат ввода!");
	} else {
		var firstChar = guess.charAt(0);
		var row = alphabet.indexOf(firstChar);
		var column = guess.charAt(1);

		if(isNaN(row) || isNaN(column)) {
			view.displayMessage("Неверный формат ввода!");
		} else if(row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
			view.displayMessage("В молоко!");
		} else {
			return row + column;
		}
	}

	return null;

}

function init() {
	var fireButton = document.getElementById('fireButton');
	fireButton.onclick = handleFireButton;
	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;

	model.generateShipLocations();
}

function handleFireButton() {
	var guessInput = document.getElementById('guessInput');
	var guess = guessInput.value.toUpperCase();

	controller.processGuess(guess);

	guessInput.value = '';
}

function handleKeyPress(e) {
	var fireButton = document.getElementById("fireButton");
	if (e.keyCode === 13) {
		fireButton.click();
		return false;
	}
}

window.onload = init;
