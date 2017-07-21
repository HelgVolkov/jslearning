'use strict';

function validate(phoneNumber) {
	if(phoneNumber.length > 8 || phoneNumber < 7) {
		console.log('1');
		return false;
	}

	var first = phoneNumber.substring(0, 3);
	var second = phoneNumber.substring(phoneNumber.length - 4);

	if(isNaN(first) || isNaN(second)) {
		console.log('2');
		return false;
	}

	if(phoneNumber.length === 8) {
		if(phoneNumber.charAt(3) !== '-') {
			console.log('3');
			return false;
		}
	}

 	console.log('ok');
}

validate('1234567');