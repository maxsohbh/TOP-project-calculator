function operate(func, a, b) {
  a = Number(a);
  b = Number(b);
  switch (func){
      case '+':
          return a+b;
      case '-':
          return a-b;
      case '*':
          return a*b;
      case '/':
          return a/b; 
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

let firstNumber ='';
let secondNumber = '';
let storednum = '';

let firstOperator = null;
let clearscreenlogic = false;
let canpress = false;
let equalpress = false;
let result;

numBtn.forEach( numpad => numpad.addEventListener('click', function(e){
  //if its the starting, need to clear screen
  // display out the number to the screen
  //enable operator buttons
  if(clearscreenlogic) resetScreen();
  displayOut(e.target.value)
  // storeFirstNumber();
  if(firstOperator && equalpress == false){
    storednum = screen.value;
  }else if(firstOperator && equalpress == true){
    firstNumber = e.target.value;
  }
  canpress = true;
  equalpress = false;
}))

opBtn.forEach(op => op.addEventListener('click', function(e){
  //if operator buttons enabled, proceed
  //check if its the first operator,store it, then wait for next number input
  //if 2nd operator, calculate the previous, store the new operator
  if(equalpress){
    storeOperator(e.target.value)
    // storednum = screen.value;
    equalpress = false;
    return
  };
  if(canpress){
    if(firstOperator){
      storeSecondNumber();
      // result = calculate();
      screen.value = Math.round( operate(firstOperator, firstNumber, storednum)*1000)/1000;

      // screen.value = result;
    }
    storeFirstNumber();
    storeOperator(e.target.value);
    clearscreenlogic= true
    canpress = false;
  }   
}))

equalBtn.addEventListener('click', function(){
  //check if first operator exist, yes then proceed to calculate
  //what if theres press without 2nd number, it operate with itself first number
  //screen value to equal the result
  // storeFirstNumber(); //not the right way
  equalpress = true;
  storeSecondNumber(); // need a condition to run this only once accordingly.
  if(firstOperator){
    screen.value = Math.round( operate(firstOperator, firstNumber, storednum)*1000)/1000;

    storeFirstNumber();
    // firstNumber ='';
    clearscreenlogic = true;
  }
})

//function to store the first number
function storeFirstNumber(){
  firstNumber = screen.value;  
}

function storeOperator(op){
  firstOperator = op;
}

function storeSecondNumber(){
  secondNumber = screen.value;
}

function calculate(){
  let result = Math.round( operate(firstOperator, firstNumber, secondNumber)*1000)/1000;
  return result;
}

decimalBtn.addEventListener('click', function(e){
  //similar as numBtn,
  //if its the starting, clear current screen
  //if no value, add 0 infront, then the dot
  //if have dot, no duplicates allowed
  if(clearscreenlogic) resetScreen();
  if(screen.value ==''){
    displayOut("0" + e.target.value);
  }
  if(screen.value.includes('.'))return;
  displayOut(e.target.value);
})

allclearBtn.addEventListener('click', function(){
  //clear the screen, clear the stored 
  resetScreen();
  firstNumber ='';
  secondNumber = '';
  firstOperator = null;
})

percentBtn.addEventListener('click', function(){
  //divide current screen value by 100
  if(screen.value){
    screen.value /=100;
  }
})

plusminusBtn.addEventListener('click', function(){
  if(screen.value){
    screen.value*=-1;
  }  
})

function resetScreen(){
  screen.value = '';
  clearscreenlogic = false;
}

function displayOut(a){
  screen.value+=a;
}

