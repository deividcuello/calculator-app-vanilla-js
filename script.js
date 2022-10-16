window.addEventListener("load", () => {
    
    class Calculator{
        constructor(result, opInput){
            this.result = result;
            this.opInput = opInput;
        }

        displayAppend(char){
            this.result.style.fontSize = '20px';
            if((char == '.' && tempResult == '') || 
            ((tempResult.includes(".") && tempResult != '' && char == '.')) || 
            (tempResult[0] == '0' && !tempResult.includes(".") && char == '0') && (tempResult == 0) ||
            (tempResult == '' && opButtonsArr.includes(char)) ||
            (tempResult != '' && opButtonsArr.includes(tempResult.slice(-1)) && opButtonsArr.includes(char))) return ''
            if(opButtonsArr.includes(tempResult.slice(-1))){
                tempResult = '';
            }
            
           tempResult += char;

            if(tempResult.charAt(0) == '0' && !isNaN(parseInt(tempResult.charAt(1)))){
                tempResult = tempResult.substring(1);
                this.result.innerHTML = this.result.innerHTML.slice(0, -1) + tempResult;
            } else{
                this.result.innerHTML += tempResult.slice(-1); 
            }
        }

        displayCompute(){
            try{
                const computedResult = eval(result.innerHTML);
                opInput.innerHTML = result.innerHTML;
                result.style.fontSize = '26px';
                if (
                    typeof computedResult === 'number' &&
                    !Number.isNaN(computedResult) &&
                    !Number.isInteger(computedResult)
                  ) {
                    result.innerHTML = computedResult;
                  }
        
                result.innerHTML = computedResult;
            } catch(err) {
                result.innerHTML = 'Math Error';
                clearOne.disabled = true;
                equalButton.disabled = true;
                numberButtons.forEach(button => {
                    button.disabled = true;
                })
                opButtons.forEach(button => {
                    button.disabled = true;
                })
            }
        }

        clearAll(){
            result.innerHTML = '';
            opInput.innerHTML = '';
            if(equalButton.disabled){
                result.innerHTML = 'Math Error';
                clearOne.disabled = false;
                equalButton.disabled = false;
                numberButtons.forEach(button => {
                    button.disabled = false;
                })
                opButtons.forEach(button => {
                    button.disabled = false;
                })
            }
        }

        clearOne(){
            if(result.innerHTML == Infinity){
                result.innerHTML = '';
            }
            tempResult = tempResult.slice(0, -1);
            console.log(tempResult)
            result.innerHTML = result.innerHTML.slice(0, -1);
        }
    }

    const result = document.querySelector('[data-result]');
    const opInput = document.querySelector('[data-opInput]');
    const numberButtons = document.querySelectorAll('[data-number]');
    const opButtons = document.querySelectorAll('[data-operation]');
    const equalButton = document.querySelector('[data-equal]');
    const clearAll = document.querySelector('[data-clearAll]');
    const clearOne = document.querySelector('[data-clearOne]');

    const opButtonsArr = Array.from(opButtons).map(op => op.innerHTML);
    let tempResult = '';

    const calculator = new Calculator(result, opInput);

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
          calculator.displayAppend(button.innerText)
        })
    })

    opButtons.forEach(opButton => {
        opButton.addEventListener('click', () => calculator.displayAppend(opButton.textContent))
    });

    equalButton.addEventListener('click', calculator.displayCompute);

    clearAll.addEventListener('click', calculator.clearAll);

    clearOne.addEventListener('click', calculator.clearOne);
      
});