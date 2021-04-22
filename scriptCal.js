//a function that takes parameters of another function and two numbers
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

function percent(a) {
    return a / 100;
}

//listen to every number click and display onto the screen
const numBtn = document.querySelectorAll('.num-btn');
const ariBtn = document.querySelectorAll('.ari-btn');
const equalBtn = document.querySelector('.equals-btn');
const clearBtn = document.querySelector('.allclear-btn');
const decimalBtn = document.querySelector(".dec-btn");
const percentBtn = document.querySelector(".percent-btn");
const negBtn = document.querySelector(".neg-btn");
const screen = document.querySelector(".screen");

let val1 ='';
let val2 ='';
let firstOperator = null;
let clearscreenlogic = false;
let canpress = false;

numBtn.forEach(numpad => numpad.addEventListener("click", function (e) {
   if(clearscreenlogic) resetScreen();
   screenOut(e.target.value);
   canpress = true;
}))

ariBtn.forEach(arith => arith.addEventListener("click", function (e) {
    if(!canpress){return}
    else{
        firststep(e.target.value);
        canpress = false;

    }
}))

decimalBtn.addEventListener("click", function (e) {
    // if(clearscreenlogic) resetScreen();
    if(clearscreenlogic) resetScreen();
    if(screen.value == ''){
        screenOut("0" + e.target.value)
    }
    if (screen.value.includes(".")) return;
    screenOut(e.target.value);
})

clearBtn.addEventListener("click", aclear);

equalBtn.addEventListener("click", function(){
    if(firstOperator){
         calculate(); //check if any operator stored.
    }
    // val1 = screen.value;
    // firstOperator = operator;
    clearscreenlogic = true;
})


percentBtn.addEventListener("click", function(){
    if(screen.value){
        screen.value /=100;
    }
})
negBtn.addEventListener("click", function(){
    if(screen.value){
        screen.value*=-1;

    }
})

function firststep(operator){
    if(firstOperator)calculate(); //check if any operator stored.
    val1 = screen.value;
    firstOperator = operator; //storing the first operator
    clearscreenlogic = true; // clearscreenlogic true to clear the value of the screen for the next input
}

function calculate(){
    // if(firstOperator == null || clearscreenlogic)return;
    val2 = screen.value;
    screen.value = Math.round( operate(firstOperator, val1, val2)*1000)/1000;
    firstOperator = null;
}

function resetScreen(){
    screen.value ='';
    clearscreenlogic = false;
}

function screenOut(ans) {
    screen.value += ans;
}

function aclear() {
    screen.value = '';
    val1 = '';
    val2 = '';
}

//to detect initial zero pressed. 
function zero() {

}

