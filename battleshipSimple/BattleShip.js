'use strict';

let location1 = Math.floor(Math.random() * 5),
	location2 = location1 + 1,
	location3 = location2 + 1,
	guess,
	hits = 0,
	guesses = 0,
	isSunk = false;

while(!isSunk) {

	guess = prompt('Введите число (0-6):', '');

	if(guess < 0 || guess > 6) {
		alert('Введите корректное число!');
	} else {
		guesses++;

		if(guess == location1 || guess == location2 || guess == location3) {
			hits++;
			if(hits != 3) {
				alert('Ранил!');
			}
		} else {
			alert('Промах!');
		}

		if(hits == 3) {
			isSunk = true;
			alert('Потопил!');
		}
	}
}

let stats = 'Вам понадобилось ' + guesses + ' попыток. Ваша точность — ' + (3 / guesses);
alert(stats);