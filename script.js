const number1Display = document.querySelector(".number1-display");
const number2Display = document.querySelector(".number2-display");
const operatorDisplay = document.querySelector(".operator-value");
const resultsDisplay = document.querySelector(".results");
const enter = document.querySelector(".equals");
const operators = document.querySelectorAll(".calculator-operator");
const buttons = document.querySelectorAll(".calculator-button");
const deleteButton = document.querySelector(".calculator-special.delete");
const decimalButton = document.querySelector(".calculator-special.decimal");
const clearButton = document.querySelector(".calculator-special.clear");
const ansButton = document.querySelector(".calculator-special.result");

let number1 = "";
let number2 = "";
let result;
let currentOperator;
let operatorSymbol;

buttons.forEach(button => button.addEventListener("click", clickNumber));
operators.forEach(operator => operator.addEventListener("click", clickOperator))
enter.addEventListener("click", calculator);
addEventListener("keydown", keyboardConfig);

function clickOperator(e){
    if (!number1 && result){
        console.log("number1 doesn't exist but answer exist scenario")
        number1 = result;
        number1Display.textContent = fixDecimals(number1);
        currentOperator = e.target.dataset.key || e.key;
        if(currentOperator=="*"){
            operatorSymbol="x";
        } else if(currentOperator=="/"){
            operatorSymbol="÷";
        } else {
            operatorSymbol = currentOperator;
        }
        operatorDisplay.textContent = operatorSymbol;
    } else if(!number1){
        console.log("number1 doesn't exist senaryo");
        number1 = 0;
        number1Display.textContent = number1;
        currentOperator = e.target.dataset.key || e.key;
        if(currentOperator=="*"){
            operatorSymbol="x";
        } else if(currentOperator=="/"){
            operatorSymbol="÷";
        } else {
            operatorSymbol = currentOperator;
        }
        operatorDisplay.textContent = operatorSymbol;
        return;
    } else if(number1 && !number2){
        console.log("number1 exist but not number2 senaryo");
        currentOperator = e.target.dataset.key || e.key;
        if(currentOperator=="*"){
            operatorSymbol="x";
        } else if(currentOperator=="/"){
            operatorSymbol="÷";
        } else {
            operatorSymbol = currentOperator;
        }
        operatorDisplay.textContent = operatorSymbol;
        return;
    } else if(number1 && number2) {
        console.log("number1 & number2 exist scenaryo");
        calculator();
        currentOperator = e.target.dataset.key || e.key;
        if(currentOperator=="*"){
            operatorSymbol="x";
        } else if(currentOperator=="/"){
            operatorSymbol="÷";
        } else {
            operatorSymbol = currentOperator;
        }
        operatorDisplay.textContent = operatorSymbol;
    } else {
        console.error("Something went wrong");
    }
}

function clickNumber(e){
    if(!currentOperator){
        number1 += e.target.dataset.key || e.key;
        number1Display.textContent = number1;
    } else {
        number2 += e.target.dataset.key || e.key;
        number2Display.textContent = number2;
    }
}

function calculator(){
    if(number2 == "") return;
    if(currentOperator == "+") result = parseFloat(number1)+parseFloat(number2);
    if(currentOperator == "-") result = parseFloat(number1)-parseFloat(number2);
    if(currentOperator == "*") result = parseFloat(number1)*parseFloat(number2);
    if(currentOperator == "/") result = parseFloat(number1)/parseFloat(number2);
    number1 = "";
    number2 = "";
    currentOperator = "";
    operatorDisplay.textContent = currentOperator;
    resultsDisplay.textContent = fixDecimals(result);
    number2Display.textContent = fixDecimals(number2);
    number1Display.textContent = fixDecimals(number1);
}

deleteButton.addEventListener("click", deleteNumber)
function deleteNumber(){
    if(number2){
        number2 = number2.slice(0, -1);
        number2Display.textContent = number2;
    } else {
        number1 = number1.slice(0, -1);
        number1Display.textContent = number1;
    }
}

decimalButton.addEventListener("click", addDecimals)
function addDecimals(){
    if(number2 && !number2.includes(".")){
        number2 += ".";
        number2Display.textContent = number2;
    } else if(number1 && !number1.includes(".")) {
        number1 += ".";
        number1Display.textContent = number1;
    } else return;
}

clearButton.addEventListener("click", clearAll)
function clearAll(){
number1 = "";
number2 = "";
result = 0;
currentOperator = "";
number1Display.textContent = "";
number2Display.textContent = "";
resultsDisplay.textContent = "";
operatorDisplay.textContent = "";
}

ansButton.addEventListener("click", bringResult)
function bringResult(){
    if (!result) return;
    if(!number1){
        number1 = result;
        number1Display.textContent = fixDecimals(number1);
    } else {
        number2 = result;
        number2Display.textContent = fixDecimals(number2);
    }
}

function keyboardConfig(e){
    if(e.key == 0 ||
       e.key == 1 ||
       e.key == 2 ||
       e.key == 3 ||
       e.key == 4 || 
       e.key == 5 || 
       e.key == 6 || 
       e.key == 7 || 
       e.key == 8 || 
       e.key == 9) clickNumber(e);
    
    if(e.key == "+" ||
       e.key == "-" ||
       e.key == "/" ||
       e.key == "*") clickOperator(e);

    if(e.key == "Enter") calculator();

    if(e.key == "End") clearAll();

    if(e.key == "Delete") deleteNumber();

    if(e.key == ",") addDecimals();

    if(e.key == "PageDown") bringResult();
}

function fixDecimals(number){
    if(number=="0") return number;
    if(!number) return;
    return number = parseFloat(number.toFixed(5));
}