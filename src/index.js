function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
  return calculateRPN(transformToRPN(expr));
}

function transformToRPN(expr){

  const operators = ['+', '-', '/', '*'];
  const lowPriorityOperators = ['+', '-'];
  const middlePriorityOperators = ['*', '/'];

  function insertSpace(str, index, substr) {
    return str.slice(0, index) + substr + str.slice(index+1);
  }

  function checkSpaces(str) {
    for (let i=0; i< str.length; i++) {
      if (str[i] === ')' || str[i] === '(' || operators.includes(str[i])) {
        if (str[i-1] !== ' ' || str[i+1] !== ' ' ) {
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
      console.log('1', element);
    } else if (element === '(') {
        if (!checkBrackets(input)) {
          throw 'ExpressionError: Brackets must be paired';
        } else {
          if (isPresent(operationsArr)) {
            valuesArr.push(operationsArr.pop());
            operationsArr.push(element);
          }
        }
        console.log('2', element);
    } else if (element === ')') {
        if (!checkBrackets(input)) {
          throw 'ExpressionError: Brackets must be paired';
        }
        while(last(operationsArr) !== '(' && isPresent(operationsArr)) {
          console.log('while', element);
          valuesArr.push(operationsArr.pop());
        }
          operationsArr.pop();
        console.log('3', element);
    } else if (lowPriorityOperators.includes(element))  {
          if (operators.includes(last(operationsArr))) {
            if (isPresent(operationsArr)) {
              valuesArr.push(operationsArr.pop());
            }
            operationsArr.push(element);
          } else {
            operationsArr.push(element);
          }
          console.log('4',element);
      } else if (middlePriorityOperators.includes(element)) {
        if (lowPriorityOperators.includes(last(operationsArr))) {
          operationsArr.push(element);
        } else {
          if (isPresent(operationsArr)) {
            valuesArr.push(operationsArr.pop());
          }
          operationsArr.push(element);
        }
        console.log('5', element);
      }  
      
    })
console.log(valuesArr.concat(operationsArr.reverse()).join(' '));
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
     
    } else if (result.length >= 2) {
      let tail = result.pop();
      let head = result.pop();
      result.push(avialableOperations[element](head, tail));
    }
  });

  return result[0];  
}

module.exports = {
    expressionCalculator
}