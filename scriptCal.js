function operate(func, a, b) {
  a = Number(a);
  b = Number(b);
  switch (func) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return a / b;
    default:
      return null;
  }
}

const numBtn = document.querySelectorAll('.num-btn');
const opBtn = document.querySelectorAll('.ari-btn');
const equalBtn = document.querySelector('.equals-btn');
const allclearBtn = document.querySelector('.allclear-btn');
const decimalBtn = document.querySelector(".dec-btn");
const percentBtn = document.querySelector(".percent-btn");
const plusminusBtn = document.querySelector(".neg-btn");
const screen = document.querySelector(".screen");

let firstNumber = '';
let secondNumber = '';
let storednum = '';

let firstOperator = null;
let clearscreenlogic = false;
let canpress = false;
let equalpress = false;
let f = false;

numBtn.forEach(numpad => numpad.addEventListener('click', function () {
  numInput(numpad.textContent)
}))

function numInput(number) {
  //if its the starting, need to clear screen
  // display out the number to the screen
  //enable operator buttons
  //disable many zeros from being pressed
  if (clearscreenlogic || screen.value === '0') resetScreen();
  displayOut(number)

  //for double pressing equal sign
  //when have operator and pressed numpad(equalpress -> false)
  if (firstOperator && equalpress == false) {
    storednum = screen.value;
  }

  if (equalpress == true) {
    firstNumber = '';
    f = true; //for new equation
    storeFirstNumber(); //here
  }
  canpress = true;
  equalpress = false;
}

opBtn.forEach(op => op.addEventListener('click', function (e) {
  opInput(e.target.value)
}))

function opInput(e) {
  //if operator buttons enabled, proceed
  //check if its the first operator,store it, then wait for next number input
  //if 2nd operator, calculate the previous, store the new operator

  //for operator pressed after equal sign, which takes current screen value as second number
  if (equalpress) {
    storeOperator(e)
    storednum = screen.value;
    equalpress = false;
    return
  };
  //numpad has been pressed
  if (canpress) {
    //for 2nd round
    if (firstOperator) {
      if (f) { //for new equation
        storeFirstNumber();
        storeOperator(e)
        f = false;
        clearscreenlogic = true;
        return;
      }
      storeSecondNumber();
      screen.value = calculate();
      // screen.value = Math.round( operate(firstOperator, firstNumber, storednum)*1000)/1000;
    }
    storeFirstNumber();
    storeOperator(e);
    clearscreenlogic = true
    canpress = false;
  }
}
equalBtn.addEventListener('click', equalInput);

function equalInput() {
  //check if first operator exist, yes then proceed to calculate
  //what if theres press without 2nd number, it operate with itself first number
  //screen value to equal the result
  equalpress = true;
  // storeSecondNumber(); // need a condition to run this only once accordingly.
  if (firstOperator) {
    screen.value = Math.round(operate(firstOperator, firstNumber, storednum) * 1000) / 1000;
    storeFirstNumber();
    clearscreenlogic = true;
  }
}

//function to store the first number
function storeFirstNumber() {
  firstNumber = screen.value;
}

function storeOperator(op) {
  firstOperator = op;
}

function storeSecondNumber() {
  secondNumber = screen.value;
}

function calculate() {
  return Math.round(operate(firstOperator, firstNumber, secondNumber) * 1000) / 1000;

}

decimalBtn.addEventListener('click', function () {
  decimalInput();
})

function decimalInput() {
  //similar as numBtn,
  //if its the starting, clear current screen
  //if no value, add 0 infront, then the dot
  //if have dot, no duplicates allowed
  if (clearscreenlogic) resetScreen();
  if (screen.value == '') {
    displayOut("0");
  }
  if (screen.value.includes('.')) return;
  displayOut('.');
}

allclearBtn.addEventListener('click', function () {
  //clear the screen, clear the stored 
  resetScreen();
  firstNumber = '';
  secondNumber = '';
  firstOperator = null;
})

percentBtn.addEventListener('click', function () {
  //divide current screen value by 100
  if (screen.value) {
    screen.value /= 100;
  }
})

plusminusBtn.addEventListener('click', function () {
  if (screen.value) {
    screen.value *= -1;
  }
})

function resetScreen() {
  screen.value = '';
  clearscreenlogic = false;
}

function displayOut(a) {
  screen.value += a;
}

window.addEventListener('keydown', keypress);
function keypress(event) {
  if (event.key >= 0 && event.key <= 9) { numInput(event.key) }
  if (event.key == '.') { decimalInput() }
  if (event.key === '=' || event.key == "Enter" || event.key == 'Return') { equalInput() }
  if (event.key === '-' || event.key === '+' || event.key === '*' || event.key === "/") { opInput(event.key) }

}
