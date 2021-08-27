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

  function splitElements(expr) {
    if (expr.includes(' ')){
      return expr.trim().split(' ');
    } else {
      return expr.trim().split('');
    }
  }

  function last(arr) {
    return arr[arr.length - 1];
  }
          
  function isPresent(arr) {
    return arr.length > 0;
  }
  let valuesArr = [];
  let operationsArr = [];
  splitElements(expr).forEach(function(element) {
    if (!isNaN(element)) {
      valuesArr.push(+element);
    } else if (element ==='(') {
      operationsArr.push(element);
    } else if (element ===')') {
        while(operationsArr.includes('(')){
          if (last(operationsArr) !== '(') {
            valuesArr.push(last(operationsArr));
          } else {
            last(operationsArr).pop();
          }
        }
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
      }  
    })
  console.log(expr, valuesArr, operationsArr, valuesArr.concat(operationsArr.reverse()));
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