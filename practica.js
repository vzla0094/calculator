let displayableButtonsArr = Array.from(document.querySelectorAll("button[data-type]"));
let actionButtonsArr = Array.from(document.querySelectorAll("button[data-action]"));
let screenOpPar = document.getElementById('operation');
let screenResPar = document.getElementById('results');
class MemObj{
	constructor(){
		this.multiply = (a, b) =>  a * b;
		this.divide = (a, b) => a / b;
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

function action (event) {
	switch (event.target.getAttribute('data-action')){
		case 'clear':
			memObj = new MemObj;
			screenOpPar.textContent = "";
			screenResPar.textContent = "";
			keyCount = 0;
			break;
		case 'operate':			
			operate(memObj.mem);
			screenResPar.textContent = memObj.mem[0];
			break;
	}
}

function display (event) {	
	switch (event.target.getAttribute('data-type')){		
		case 'value':
			storer('valueProp', event.target.textContent);
			break;
		case 'operator':			
			storer('operatorProp', event.target.textContent);
			keyCount += 2;			
			break;		
	}
	screenOpPar.textContent += event.target.textContent;
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
			a = parseInt(arr[i-1]);
			b = parseInt(arr[i+1]);
			memObj.mem.splice(i-1, 3, memObj.multiply(a, b));
			i--;
		}else if(arr[i] === '÷'){
			a = parseInt(arr[i-1]);
			b = parseInt(arr[i+1]);
			memObj.mem.splice(i-1, 3, memObj.divide(a, b));
			i--;
		}
	}
	for (let i = 0; i < arr.length; i++){
		let a;
		let b;
		if(arr[i] === '+'){
			a = parseInt(arr[i-1]);
			b = parseInt(arr[i+1]);
			memObj.mem.splice(i-1, 3, memObj.add(a, b));
			i--;
		}else if(arr[i] === '-'){
			a = parseInt(arr[i-1]);
			b = parseInt(arr[i+1]);
			memObj.mem.splice(i-1, 3, memObj.substract(a, b));
			i--;
		}
	}
}