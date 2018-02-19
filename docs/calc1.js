

let equationArray = [];
let currentDisplay = "";
let buttons = document.querySelectorAll('.button');
for (let x = 0; x<buttons.length; x++) {
	buttons[x].addEventListener('click', function(e) {
		let y = this.textContent
		addToArray(y);
	});
}



function addToArray(butVal) {
	let buttonValue = butVal.toString();
	equationArray.push(buttonValue);
	let equalsButton = false;
	if (currentDisplay !== "") {
		if (buttonValue == '+' || buttonValue == '-' || buttonValue == '/' || buttonValue == '*') {
			let nothing = buttonValue;

		}
		else {
			equationArray = [];
			equationArray.push(buttonValue);
			currentDisplay == "";
		}
	}
	for (let i = 0; i<equationArray.length; i++) {
		
		if (equationArray[i] == 'DEL') {
			equationArray.splice(i-1, 2);
		}

		if (equationArray[i] == '+' || equationArray[i] == '-' || equationArray[i] == '*' || equationArray[i] == '/') {
			let placeholder =  ' ' + equationArray[i] + ' ';
			equationArray.splice(i, 1, placeholder);

		}

		if (equationArray[i] == '=') {
			equationArray[i] = ' =';
			equalsButton = true;
		}
	
	}

	if (butVal == 'AC') {
		equationArray = [];
		currentDisplay = "";
	
	}

	let negArray = equationArray.slice(0, equationArray.length);
	for (let j = 0; j<negArray.length; j++) {
		if(negArray[j] == '(-)') {
			negArray[j] = '-';
		}
	}
	
	let equationString = negArray.join('');
	const displayCont = document.querySelector('#display');
	const bigDisplay = document.querySelector('#currentDisplay');
	bigDisplay.textContent = currentDisplay;
	let equate = document.querySelector('#equation');
	equate.textContent = equationString;
	displayCont.insertBefore(equate, bigDisplay);
	displayCont.appendChild(bigDisplay);

	if (equalsButton) {
		operate(equationString);
	}


}

function operate(stringVal) {
	let checkArray = stringVal.split(" ");
	let equalSignRemover = checkArray.length - 1;
	checkArray.splice(equalSignRemover, 1);
	let returnDisplay = "";
	let operateArray = [];

	for (let k = 0; k<checkArray.length; k++) {
		let z = k % 2;
		if (z == 0) {
			let numbaCheck = parseFloat(checkArray[k]);
			if (numbaCheck == NaN) {
				returnDisplay = "Error";
				break;
			}
			else {
				operateArray[k] = numbaCheck;
			}
		}
		else if ( z == 1) {
			let OC = checkArray[k];
			if (OC == '+' || OC == '-' || OC == '*' || OC == '/') {
				operateArray[k] = OC;
			}
			else {
				returnDisplay = "Error";
				break;
			}
		}
	}

	if (returnDisplay !== "Error") {
		let lengthCounter = operateArray.length;
		for (let a = 0; a<lengthCounter; a++) {
			if (operateArray[a] == '*') {
				let multiplyVal = multiply(operateArray[a-1], operateArray[a+1]);
				operateArray.splice(a-1, 3, multiplyVal);
				a = 0;
				lengthCounter -=2;
			}
			if (operateArray[a] == '/') {
				let divideVal = divide(operateArray[a-1], operateArray[a+1]);
				operateArray.splice(a-1, 3, divideVal);
				a = 0;
				lengthCounter -=2;
			}
			
		}

		for (let b = 0; b<lengthCounter; b++) {
			if (operateArray[b] == '+') {
				let addVal = add(operateArray[b-1], operateArray[b+1]);
				operateArray.splice(b-1, 3, addVal);
				b = 0;
				lengthCounter -=2;
			}
			if (operateArray[b] == '-') {
				let subVal = subtract(operateArray[b-1], operateArray[b+1]);
				operateArray.splice(b-1, 3, subVal);
				b = 0;
				lengthCounter -=2;
			}
		}

		
		returnDisplay = operateArray[0].toString();


	}
	equationArray = [];
	equationArray.push(returnDisplay);

	let displayContainer = document.querySelector('#display');
	let answerDisplay = document.querySelector('#currentDisplay');
	
	answerDisplay.textContent = returnDisplay;
	displayContainer.appendChild(answerDisplay);


}

function multiply(num1, num2) {
	return num1 * num2;
}

function divide(num1, num2) {
	return num1 / num2;
}

function add(num1, num2) {
	return num1 + num2;
}

function subtract(num1, num2) {
	return num1 - num2;
}
