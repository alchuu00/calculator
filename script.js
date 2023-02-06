let firstNum = ''
let secondNum = ''
let operator = ''

const digits = document.querySelectorAll('#digit');
const displayLower = document.querySelector('.display-lower')
const displayUpper = document.querySelector('.display-upper')
const operators = document.querySelectorAll('.operator')
const equal = document.getElementById('equal')
const float = document.querySelector('.float')

// listen for digits of firstNum and assign them to a variable
function getFirstNum() {
    let digit = this.textContent;
    if (firstNum === '' && digit === '') {
        return;
    }
    firstNum += digit;
    displayLower.textContent = firstNum;
    console.log('first num ' + firstNum)
}

function getSecondNum() {
    // Stop listening for firstNum
    removeListenerFirstNum()
    // listen for digits of secondNum and assign them to a variable
    let digit = this.textContent;
    if (secondNum === '' && digit === '') {
        return;
    }
    secondNum += digit;
    displayLower.textContent = secondNum;
    console.log('second num ' + secondNum)
}

function getOperator() {
// when user clicks operator stop listening for firstNum
    removeListenerFirstNum()

    let opSymbol
    let operator = this.getAttribute('id')

    console.log('operator ' + operator)

    if (!firstNum) {
        firstNum = 0;
    }
    if (operator === 'sum') {
        opSymbol = '+'
    } else if (operator === 'subtract') {
        opSymbol = '-'
    } else if (operator === 'divide') {
        opSymbol = '÷'
    } else if (operator === 'multiply') {
        opSymbol = '×'
    }
    // display firstNum and operator in upperDisplay 
    displayUpper.textContent = `${firstNum} ${opSymbol} `;
    displayLower.textContent = ''

    digits.forEach(function (dig) {
        dig.addEventListener("click", getSecondNum)
    })
    // when user clicks equal display result
    equal.addEventListener('click', function () {
        if (!firstNum || !secondNum || !operator) {
            return;
        }
        if (operator === 'sum') {
            displayUpper.textContent = `${firstNum} ${opSymbol} ${secondNum} =`; 
            displayLower.textContent = parseFloat(firstNum) + parseFloat(secondNum);
        } else if (operator === 'subtract') {
            displayUpper.textContent = `${firstNum} ${opSymbol} ${secondNum} =`;
            displayLower.textContent = parseFloat(firstNum) - parseFloat(secondNum);
        } else if (operator === 'divide') {
            displayUpper.textContent = `${firstNum} ${opSymbol} ${secondNum} =`;
            displayLower.textContent = parseFloat(firstNum) / parseFloat(secondNum);
        } else if (operator === 'multiply') {
            displayUpper.textContent = `${firstNum} ${opSymbol} ${secondNum} =`;
            displayLower.textContent = parseFloat(firstNum) * parseFloat(secondNum);
        }
    })
}

// button to reset all variables to null
function clear() {
    const buttonClear = document.querySelector('.button-clear');
    buttonClear.addEventListener('click', function () {
        console.log('CLEAR');
        firstNum = '';
        secondNum = '';
        operator = '';
        displayLower.textContent = '';
        displayUpper.textContent = '';
    })
}

function removeListenerFirstNum() {
    digits.forEach(function (dig) {
        dig.removeEventListener("click", getFirstNum)
    })
}

function removeListenerSecondNum() {
    digits.forEach(function (dig) {
        dig.removeEventListener("click", getSecondNum)
    })
}


// START

digits.forEach(function (dig) {
    dig.addEventListener("click", getFirstNum)
    dig.removeEventListener('click', getSecondNum)
})
operators.forEach(function (op) {
    op.addEventListener('click', getOperator)
})

clear()
