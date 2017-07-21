"use strict";

var scores = [60, 50, 60, 58, 54, 54,
			  58, 50, 52, 54, 48, 69,
			  34, 55, 51, 52, 44, 51,
			  69, 64, 66, 55, 52, 61,
			  46, 31, 57, 52, 44, 18,
			  51, 53, 55, 61, 51, 44];


var costs = [.25, .27, .25, .25, .25, .25,
			 .33, .31, .25, .29, .27, .22,
			 .31, .25, .25, .33, .21, .25,
			 .25, .25, .28, .25, .24, .22,
			 .20, .25, .30, .25, .24, .25,
			 .25, .25, .27, .25, .26, .29]


var highScore = printAndGetHighScore(scores);
console.log('Bubbles tests: ' + scores.length);
console.log('Highest bubble score: ' + highScore);


var bestSolutions = getBestResults(scores, highScore);
console.log('Solutions with highest score: ' + bestSolutions);

var mostCostEffective = getMostCostEffectiveSolution(scores, costs, highScore);
console.log("Bubble Solution #" + mostCostEffective + " is the most cost effective");


function printAndGetHighScore(array) {
	var output;
	var highScore = 0;

	for (var i = 0; i < array.length; i++) {
		output = 'Bubble solution #' + i + ' score: ' + array[i];

		if(scores[i] > highScore) {
			highScore = array[i];
		}

		console.log(output);
	}

	return highScore;
}


function getBestResults(array, highScore) {

	var bestSolutions = [];

	for (var i = 0; i < array.length; i++) {
		if(array[i] == highScore) {
			bestSolutions.push(i);
		}
	}

	return bestSolutions;
}


function getMostCostEffectiveSolution(score, costs, highScore) {

	var cost = 100;
	var index;

	for (var i = 0; i < score.length; i++) {
		if(score[i] == highScore) {
			if(cost > costs[i]) {
				index = i;
				cost = costs[index];
			}
		}
	}

	return index;
}