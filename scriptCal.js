//a function that takes parameters of another function and two numbers
function operate(func, a, b) {

    return func(Number(a), Number(b))
}
//arithemetics
function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function percent(a) {
    return a / 100;
}


console.log(operate(add, 1, 5));
console.log(operate(substract, 1, 5));
console.log(operate(multiply, 1, 5));
console.log(operate(divide, 1, 5));
console.log(operate(percent, 1));


//listen to every number click and display onto the screen
const numBtn = document.querySelectorAll('.num-btn');
const ariBtn = document.querySelectorAll('.ari-btn');
const equalBtn = document.querySelector('.equals-btn');
const clearBtn = document.querySelector('.allclear-btn');
const decimalBtn = document.querySelector(".dec-btn");
const percentBtn = document.querySelector(".percent-btn");
const negBtn = document.querySelector(".neg-btn");
const screen = document.querySelector(".screen");

let val, val1, val2;



numBtn.forEach(numpad => numpad.addEventListener("click", function (e) {
    let x = e.target.value;
    val = screenOut(x);
    console.log(val);
}))

let temp;
ariBtn.forEach(arith => arith.addEventListener("click", function (e) {
    if (val1 == null) {
        val1 = screen.value;
        console.log('value 1: ' + val1)
    } else {
        val2 = screen.value;
        console.log('value 2: ' + val2)
        switch (e.target.value) {
            case '+':
                temp = operate(add, val1, val2);
        }
    }

    val1 = temp;
    screen.textContent = temp;


    // reset();


}))

decimalBtn.addEventListener("click", function (e) {
    if (val.includes(".")) return;
    val1 = screenOut(e.target.value);
})

function screenOut(ans) {
    let y = document.querySelector(".screen").value += ans;
    return y;
}

function reset() {
    document.querySelector(".screen").value = '';
}

//to detect initial zero pressed. 
function zero() {

}

//store value when click the all the buttons except numbers
function storeValue() {

}
