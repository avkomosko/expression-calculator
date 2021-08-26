function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let input;
    if (expr.includes(' ')){
        input = expr.trim().split(' ');
    } else {
        input = expr.trim().split('');
    }
    let valuesArr = [];
    let operationsArr = [];
    let operationsTopItem = operationsArr[operationsArr.length-1];
    let result=[];
    for (let i=0; i<input.length; i++){
        let char = input[i];
        if (!isNaN(char)) {
            valuesArr.push(+char);
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
        } else if (char === '+' || char === '-')  {
            if (operationsTopItem === '+' || operationsTopItem === '-' || operationsTopItem === '*' || operationsTopItem === '/') {
                if (operationsArr.length >0) {
                    valuesArr.push(operationsArr.pop());
                }
                operationsArr.push(char);
            } else {
                operationsArr.push(char);
            }
        } else if (char === '*' || char === '/') {
            if (operationsTopItem === '+' || operationsTopItem === '-') {
                operationsArr.push(char);
            } else {
                if (operationsArr.length >0) {
                    valuesArr.push(operationsArr.pop());
                }
                operationsArr.push(char);
            }  
        } else if (char === ' '){
            continue;
        } 
        console.log(input, valuesArr,operationsArr);
    }
    
    while (operationsArr.length !==0){
       valuesArr.push(operationsArr.pop());
    }
   
    for (let i =0 ; i < valuesArr.length; i++) {
        let subresult;
        if (typeof(valuesArr[i])==='number'){
            result.push(valuesArr[i]);
            console.log(valuesArr, result);
        } else if (valuesArr[i] === '+' && result.length >=2 ) {
            subresult = result.pop();
            result[result.length-1] = result[result.length-1] + subresult;
            console.log(valuesArr, result);
        } else if (valuesArr[i] === '-' && result.length >=2) {
            subresult = result.pop();
            result[result.length-1] = result[result.length-1] - subresult;
            console.log(valuesArr, result);
        } else if (valuesArr[i] === '*' && result.length >=2) {
            subresult = result.pop();
            result[result.length-1] = result[result.length-1] * subresult;
            console.log(valuesArr, result);
        } else if (valuesArr[i] === '/' && result.length >=2) {
            subresult = result.pop();
            if (subresult === 0) {
                throw 'TypeError: Division by zero.';
            }
            result[result.length-1] = result[result.length-1] / subresult;
            console.log(valuesArr, result);
        } 
        // console.log(temp1, temp2); 
        // console.log(result);
    }     
    
    
return result[0];
  
}

module.exports = {
    expressionCalculator
}