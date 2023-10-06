const buttons = document.querySelectorAll("button");
const displayText = document.querySelector("input");

let checkOpe = true;
let checkEqual = false;
let formula = "";
let lastNum = "";

function addOpe(e) {
    if(checkOpe) return false;
    if(checkEqual) checkEqual = false;
    formula += e;
    lastNum = "";
    return checkOpe = true;
}

function addNum(e) {
    if(checkEqual) {
        formula = e;
        checkEqual = false;
    } else {
        formula += e;
    }
    lastNum += e
    displayText.placeholder = lastNum;
    checkOpe = false;
}

function speOpe(e) {
    if(e == "+/-") {
        formula -= lastNum;
        lastNum = "-" + lastNum;
        formula += lastNum;
        displayText.placeholder = lastNum;
    } else {
        formula += "*0.01";
        calculate();
    }
}

function clear() {
    formula = "";
    lastNum = "";
    displayText.placeholder = "0";
    checkOpe = true;
}

function calculate() {
    if (checkOpe) return;
    formula = eval(formula
        .replace("×", "*")
        .replace("÷", "/")
    );
    displayText.placeholder = formula;
    checkEqual = true;
    lastNum = "";
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        switch (button.className) {
            case 'ac':
                clear();
                break;
            case 'equal':
                checkEqual = true;
                calculate();
                break;
            case 'ope':
                addOpe(button.innerText);
                checkOpe = true;
                break;
            case 'spe':
                speOpe(button.innerText);
                break;
            case 'num':
                addNum(button.innerText);
                break;
            case 'zero':
                addNum(button.innerText);
                break;
            default:
                break;

        }
    })
})