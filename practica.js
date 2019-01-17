let displayableButtonsArr = Array.from(document.querySelectorAll("button[data-type]"));
let actionButtonsArr = Array.from(document.querySelectorAll("button[data-action]"));
let screenOpPar = document.getElementById('operation');
let screenResPar = document.getElementById('results');
document.addEventListener('keydown', event => { //add keyboard functionality
	let button = document.querySelector(`button[data-key="${event.key}"]`);
	if (button){
		if(button.getAttribute('data-key') === '='){
			button.addEventListener('transitionend', e => e.target.classList.remove('pressEqual'));
			button.classList.add('pressEqual');
		}else if(button.getAttribute('data-key') === 'Delete'){
			button.addEventListener('transitionend', e => e.target.classList.remove('pressClear'));
			button.classList.add('pressClear');
		}else {
			button.addEventListener('transitionend', e => e.target.classList.remove('pressButton'));
			button.classList.add('pressButton');
		}
		
		if (button.hasAttribute('data-action')){
			action(button);
		}else display(button);
	} 
});
class MemObj{
	constructor(){
		this.multiply = (a, b) =>  a * b;
		this.divide = (a, b) => b===0 ? "LOOOOOOL" : a / b;
		this.add = (a, b) => a + b;
		this.substract = (a, b) => a - b;
		this.mem = [];
	}
}
let memObj = new MemObj;
let keyCount = 0;
for(let element of displayableButtonsArr){
	element.addEventListener('click', display);	
}
for(let element of actionButtonsArr){
	element.addEventListener('click', action);
}

function action (caller) {
	let button;
	if (caller.target === undefined){
		button = caller;
	}else button = caller.target;
	switch (button.getAttribute('data-action')){
		case 'clear':
			memObj = new MemObj;
			screenOpPar.textContent = "";
			screenResPar.textContent = "";
			break;
		case 'operate':			
			operate(memObj.mem);
			screenResPar.textContent = memObj.mem[0];
			break;
	}
	keyCount = 0;
}

function display (caller) {
	let button;
	if (caller.target === undefined){
		button = caller;
	}else button = caller.target;
	switch (button.getAttribute('data-type')){		
		case 'value':
			storer('valueProp', button.textContent);
			break;
		case 'operator':			
			storer('operatorProp', button.textContent);
			keyCount += 2;			
			break;		
	}
	screenOpPar.textContent += button.textContent;
	function storer(prop, value){
		switch (prop){
			case 'valueProp':
				if (memObj.mem[keyCount] === undefined){
					memObj.mem.push(value);
				}else{
					memObj.mem[keyCount] += value;
				};				
				break;
			case 'operatorProp':
				memObj.mem.push(value);
				break;
		}
	}
};

function operate (arr){
	for(let i = 0; i < arr.length; i++){
		let a;
		let b;
		if(arr[i] === '*'){
			a = parseFloat(arr[i-1]);
			b = parseFloat(arr[i+1]);
			memObj.mem.splice(i-1, 3, memObj.multiply(a, b));
			i--;
		}else if(arr[i] === '÷'){
			a = parseFloat(arr[i-1]);
			b = parseFloat(arr[i+1]);
			memObj.mem.splice(i-1, 3, memObj.divide(a, b));
			i--;
		}
	}
	for (let i = 0; i < arr.length; i++){
		let a;
		let b;
		if(arr[i] === '+'){
			a = parseFloat(arr[i-1]);
			b = parseFloat(arr[i+1]);
			memObj.mem.splice(i-1, 3, memObj.add(a, b));
			i--;
		}else if(arr[i] === '-'){
			a = parseFloat(arr[i-1]);
			b = parseFloat(arr[i+1]);
			memObj.mem.splice(i-1, 3, memObj.substract(a, b));
			i--;
		}
	}
}