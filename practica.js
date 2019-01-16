let displayableButtonsArr = Array.from(document.querySelectorAll("button[data-type]"));
let actionButtonsArr = Array.from(document.querySelectorAll("button[data-action]"));
let screenPar = document.getElementById('screen').querySelector('p');
let temp = 0;
class MemObj{
	constructor(){
		this.pemdas = {
			p: [],
			e: [],
			md: [],
			as: [],
		}
		this.multiply = (a, b) =>  a * b;
		this.divide = (a, b) => a / b;
		this.add = (a, b) => a + b;
		this.substract = (a, b) => a - b;
		this.operators = {};
		this.values = {};
	}
}
let memObj = new MemObj;
let keyCount = 1;
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
			screenPar.textContent = "";
			keyCount = 1;
			temp = 0;
			break;
		case 'operate':			
			if (memObj.pemdas.md){
				let a;
				let b;
				for (let op of memObj.pemdas.md){
					if (memObj.values[op.operatorNumber]){
						a = memObj.values[op.operatorNumber];
					}else {
						a = temp;
					}
					if (memObj.values[op.operatorNumber+1]){
						b = memObj.values[op.operatorNumber+1];
					}else {
						b = temp;					
					}
					temp = memObj[op.operation](a, b);
					memObj.values[op.operatorNumber] = null;
					memObj.values[op.operatorNumber+1] = null;
				}
			}
			if(memObj.pemdas.as){
				let a;
				let b;
				for (let op of memObj.pemdas.as){
					if (memObj.values[op.operatorNumber]){
						a = memObj.values[op.operatorNumber];
					}else {
						a = temp;
					}
					if (memObj.values[op.operatorNumber+1]){
						b = memObj.values[op.operatorNumber+1];
					}else {
						b = temp;					
					}
					temp = memObj[op.operation](a, b);
					memObj.values[op.operatorNumber] = null;
					memObj.values[op.operatorNumber+1] = null;
				}
			}
	}
}

function display (event) {	
	switch (event.target.getAttribute('data-type')){		
		case 'value':
			storer('valueProp', parseInt(event.target.textContent));
			screenPar.textContent += event.target.textContent;
			break;
		case 'operator':			
			storer('operatorProp', event.target.textContent);
			keyCount += 1;
			screenPar.textContent += event.target.textContent;
			break;		
	}
	function storer(prop, value){
		switch (prop){
			case 'valueProp':
				if (memObj.values[keyCount] === undefined){
					memObj.values[keyCount] = value;
				}else{
					memObj.values[keyCount] += value;
				};
				break;
			case 'operatorProp':
				memObj.operators[keyCount] = value;
				pemdas(value);
				break;
		}
		function pemdas (operator){
			switch (operator){
				case '*': memObj.pemdas.md.push({
					operatorNumber:keyCount,
					operation:'multiply'
				});				
				break;
				case '÷': memObj.pemdas.md.push({
					operatorNumber:keyCount,
					operation: 'divide'
				});
				break;
				case '+': memObj.pemdas.as.push({
					operatorNumber:keyCount,
					operation: 'add'
				});
				break;
				case '-': memObj.pemdas.as.push({
					operatorNumber:keyCount,
					operation: 'substract'
				});
				break;
			}		
		}
	}
};


