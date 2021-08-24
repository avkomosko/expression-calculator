function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let input = expr.split('');
    let valuesArr = [];
    let operationsArr = [];
    let operationsTopItem = operationsArr[operationsArr.length-1];
    for (let i=0; i<input.length; i++){
        let char = input[i];
        if (!isNaN(char) && char !== ' ' && char !== '') {
            valuesArr.push(char);
        } else if (char ==='(') {
            operationsArr.push(char);
        } else if (char ===')') {
            while(operationsArr.includes('(')){
                if (operationsTopItem !== '(') {
                    valuesArr.push(operationsTopItem);
                } else {
                    operationsTopItem.pop();
                } 
            }
        } else if ((char === '+' || char === '-') && char !== '' && char !== ' ' )  {
            if (operationsTopItem === '+' || operationsTopItem === '-') {
                if (operationsArr.length >0) {
                    valuesArr.push(operationsArr.pop());
                }
                operationsArr.push(char);
            } else {
                operationsArr.push(char);
            }
        } else if ((char === '*' || char === '/') && (char !== '' && char !== ' ')) {
            if (operationsTopItem === '+' || operationsTopItem === '-') {
                operationsArr.push(char);
            } else {
                if (operationsArr.length >0) {
                    valuesArr.push(operationsArr.pop());
                }
                operationsArr.push(char);
            }  
        } else if (char === '' || char === ' ' ){

            continue;
        }
        // console.log(input,valuesArr, operationsArr);
    }
    while (operationsArr.length !==0){
       valuesArr.push(operationsArr.pop());
    }
    
    function Calc(arr){
        let result;
        for (let i=0; i< arr.length; i++) {
            if (arr[i]=== '+') {
                result = +arr[i-1] + (+arr[i-2]);
            } else if (arr[i]=== '-') {
                result = +arr[i-1] - (+arr[i-2]);
            } else if (arr[i]=== '*') {
                result = +arr[i-1] * (+arr[i-2]);
            } else if (arr[i]=== '/') {
                try {
                    result = +arr[i-2] / (+arr[i-1]);
                   if (+arr[i-1] === 0) {
                    throw new Error("TypeError: Division by zero.");
                   }
                }  catch(e){
                    console.log('divission by zero');
                }  
                
            }
        }
        return result;
    }
    console.log(input,valuesArr, Calc(valuesArr));
  
}

module.exports = {
    expressionCalculator
}