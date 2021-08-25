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
            if (operationsTopItem === '+' || operationsTopItem === '-') {
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

    }
    
    while (operationsArr.length !==0){
       valuesArr.push(operationsArr.pop());
    }

    while (valuesArr.length >0) {
        let temp1;
        let temp2;
        let subresult;
        if (typeof(valuesArr[0])==='number'){
            let shifted = valuesArr.shift();
           result.push(shifted);
        } else if (item === '+') {
            temp1 = result.pop();
            temp2 = result.pop();
            subresult = temp1 + temp2;
            result.push(subresult);
        } else if (item === '-') {
            temp1 = result.pop();
            temp2 = result.pop();
            result.push(temp1 - temp2);
        } else if (item === '*') {
            temp1 = result.pop();
            temp2 = result.pop();
            result.push(temp1 * temp2); 
        } else if (item === '/') {
            temp1 = result.pop();
            temp2 = result.pop();
            if (temp1 === 0) {
                throw 'TypeError: Division by zero.';
            }
            result.push(temp2 / temp1);
        } 
        console.log(temp1, temp2); 
        console.log(result);
    }     
    
    
// console.log(result);
  
}

module.exports = {
    expressionCalculator
}