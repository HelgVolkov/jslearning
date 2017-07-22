'use strict';

window.onload = init;

function init() {
	var image = document.getElementById('img');
	image.onclick = showAnswer;
	console.log(image.classList);
}

function showAnswer() {
	var image = document.getElementById('img');
	image.classList.remove('img_blured');
}