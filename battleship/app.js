'use strict';

var view = {
	displayMessage: function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},
	displayMiss: function(location) {
		var cell = document.getElementById(location);
		if(cell) {
			cell.setAttribute("class", "miss");
		} else {
			console.log('Произошла ошибка!');
		}
	},
	displayHit: function(location) {
		var cell = document.getElementById(location);
		if(cell) {
			cell.setAttribute("class", "hit");
		} else {
			console.log('Произошла ошибка!');
		}
	}
};

var model = {
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipSunk: 0,
	ships: [
		{ locations: ["06", "16", "26"], hits: ["", "", ""] },
		{ locations: ["24", "34", "44"], hits: ["", "", ""] },
		{ locations: ["10", "11", "12"], hits: ["", "", ""] }
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
		for (var i = 0; i < this.numShips.length; i++) {
			if(ship.hits[i] !== "hit") {
				return false;
			}
		}
		return true;
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
		}
	}
};

function parseGuess(guess) {
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

	if(guess === null || guess.length !== 2) {
		console.log("Неверный формат ввода!");
	} else {
		var firstChar = guess.charAt(0);
		var row = alphabet.indexOf(firstChar);
		var column = guess.charAt(1);

		if(isNaN(row) || isNaN(column)) {
			console.log("Неверный формат ввода!");
		} else if(row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
			console.log("В молоко!");
		} else {
			return row + column;
		}
	}

	return null;

}

controller.processGuess("A0");
controller.processGuess("A6");
controller.processGuess("B6");
controller.processGuess("C6");
controller.processGuess("C4");
controller.processGuess("D4");
controller.processGuess("E4");
controller.processGuess("B0");
controller.processGuess("B1");
controller.processGuess("B2");