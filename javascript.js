const display = document.querySelector('.display');
const clearBtn = document.getElementById('clear');
const backspaceBtn = document.getElementById('backspace');
const equalsBtn = document.getElementById('equals');
const decimalBtn = document.getElementById('decimal');
const numberBtns = document.querySelectorAll('.button:not(#clear):not(#backspace):not(#equals):not(#decimal)');
const operatorBtns = document.querySelectorAll('.button[id$="dd"]:not(#decimal)');

let currentOperand = '';
let previousOperand = '';
let currentOperator = null;

function appendNumber(number) {
  if (currentOperand.includes('.') && number === '.') return;
  currentOperand += number;
}

function updateDisplay() {
  display.textContent = `${previousOperand} ${currentOperator ? currentOperator : ''} ${currentOperand}`;
}

function clear() {
  currentOperand = '';
  previousOperand = '';
  currentOperator = null;
}

function backspace() {
  currentOperand = currentOperand.slice(0, -1);
}

function handleOperator(operator) {
  if (currentOperand === '') return;
  if (previousOperand !== '') {
    calculate();
  }
  currentOperator = operator;
  previousOperand = currentOperand;
  currentOperand = '';
}

function calculate() {
  let result;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  switch (currentOperator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '×':
      result = prev * current;
      break;
    case '÷':
      result = prev / current;
      break;
    default:
      return;
  }
  currentOperand = result.toString();
  currentOperator = null;
  previousOperand = '';
}

numberBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    appendNumber(btn.textContent);
    updateDisplay();
  })
});

operatorBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    handleOperator(btn.textContent);
    updateDisplay();
  })
});

equalsBtn.addEventListener('click', () => {
  calculate();
  updateDisplay();
});

clearBtn.addEventListener('click', () => {
  clear();
  updateDisplay();
});

backspaceBtn.addEventListener('click', () => {
  backspace();
  updateDisplay();
});

decimalBtn.addEventListener('click', () => {
  appendNumber('.');
  updateDisplay();
});
