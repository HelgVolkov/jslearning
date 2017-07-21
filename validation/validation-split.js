'use strict';

function validate(phoneNumber) {
	if(phoneNumber.length > 8 || phoneNumber.length < 7) {
		return console.log("Номер должен быть не длиннее 8 и не короче 7 символов!");
	}

	var first, second;

	if(phoneNumber.indexOf('-') != -1) {
		var tmp = phoneNumber.split('-');
		first = tmp[0];
		second = tmp[1];
	} else {
		first = phoneNumber.slice(0,3);
		second = phoneNumber.slice(3);
	}

	if(first.length != 3 || second.length != 4 || isNaN(first) || isNaN(second)) {
		return console.log("Неправильный формат!");
	}

	return console.log("Проверка пройдена!");
}

validate("123-4567");