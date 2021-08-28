function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
  return calculateRPN(transformToRPN(expr));
}

function transformToRPN(expr){

  const operators = ['+', '-', '/', '*'];
  const lowPriorutyOperators = ['+', '-'];
  const middlePriorityOperators = ['*', '/'];

  function insertSpace(str, index, substr) {
    return str.slice(0, index) + substr + str.slice(index+1);
  }
  function checkSpaces(str) {
    for (let i=0; i< str.length; i++) {
      if (str[i] === ')' || str[i] === '(' || operators.includes(str[i])) {
        if (str[i-1] !== ' ' && str[i+1] !== ' ' ) {
          str = insertSpace(str, i, ` ${str[i]} `);
        } 
      }
    }
    return str;
  }


  function splitElements(expr) {
    let exprFix = checkSpaces(expr);
    return exprFix.trim().split(' ');
  }

  function last(arr) {
    return arr[arr.length - 1];
  }
          
  function isPresent(arr) {
    return arr.length > 0;
  }

  function checkBrackets(arr) {
    let stack =[];
    if (arr.includes(')') && !arr.includes('(')) {
        return false;
    } else {
        arr.forEach(function(item) {
          if (item === '('){
            stack.push(item);
          } else if (item === ')') {
            stack.pop();
          }
        })
    }
    return stack.length === 0;
  }

  let valuesArr = [];
  let operationsArr = [];
  let input = splitElements(expr);
   
  input.forEach(function(element) {
    if (!isNaN(element) && element !== '') {
      valuesArr.push(+element);
    } else if (element === '(') {
        if (!checkBrackets(input)) {
          throw 'ExpressionError: Brackets must be paired';
        } else {
          operationsArr.push(element);
        }
    } else if (element === ')') {
        if (!checkBrackets(input)) {
          throw 'ExpressionError: Brackets must be paired';
        }
        while(last(operationsArr) !== '(') {
          valuesArr.push(operationsArr.pop());
        }
          operationsArr.pop();
        
    } else if (lowPriorutyOperators.includes(element))  {
          if (operators.includes(last(operationsArr))) {
            if (isPresent(operationsArr)) {
              valuesArr.push(operationsArr.pop());
            }
            operationsArr.push(element);
          } else {
            operationsArr.push(element);
          }
      } else if (middlePriorityOperators.includes(element)) {
        if (lowPriorutyOperators.includes(last(operationsArr))) {
          operationsArr.push(element);
        } else {
          if (isPresent(operationsArr)) {
            valuesArr.push(operationsArr.pop());
          }
          operationsArr.push(element);
        }
      }  console.log(input, valuesArr,operationsArr );
    })
  console.log(valuesArr.concat(operationsArr.reverse()));
  return valuesArr.concat(operationsArr.reverse()); 
}

function calculateRPN(arr) {
  const avialableOperations = {
    '+': sum,
    '-': subtract,
    '/': divide,
    '*': multiply,
  }

  function sum(head, tail) {
    return head + tail;
  }

  function subtract(head, tail) {
    return head - tail;
  }

  function divide(head, tail) {
    if (tail === 0) {
      throw 'TypeError: Division by zero.';
    }
    return head / tail;
  }

  function multiply(head, tail) {
    return head * tail;
  }
  
  let result = [];

  arr.forEach(function(element) {
    if (typeof(element) === 'number') {
      result.push(element);
      console.log(arr, result);
    } else if (result.length >= 2) {
      let tail = result.pop();
      let head = result.pop();
      result.push(avialableOperations[element](head, tail));
 console.log(arr, result);
    }
    console.log(arr, result);
  });

  return result[0];  
}

module.exports = {
    expressionCalculator
}