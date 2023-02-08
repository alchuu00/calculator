let currentNum = ''
let previousNum = ''
let operator = ''

const currentDisplayNumber = document.querySelector('.display-lower')
const previousDisplayNumber = document.querySelector('.display-upper')

window.addEventListener('keydown', handleKeyPress)

const equal = document.getElementById('equal')
equal.addEventListener('click', () => {
    if (currentNum != '' && previousNum != '') {
        calculate()
    }
})

const float = document.querySelector('.float')

const clear = document.querySelector('.button-clear')
clear.addEventListener('click', clearCalculator)

const del = document.querySelector('.button-delete')
del.addEventListener('click', handleDelete)

const numberButtons = document.querySelectorAll('#digit')

const operators = document.querySelectorAll('.operator')

numberButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        handleNumber(e.target.textContent)
    })
})

function handleNumber(number) {
    if (previousNum !== '' && currentNum !== '' && operator === '') {
        previousNum = ''
        currentDisplayNumber.textContent = currentNum
    }
    if (currentNum.length <= 12) {
        currentNum += number
        currentDisplayNumber.textContent = currentNum;
    }
}

operators.forEach(btn => {
    btn.addEventListener('click', (e) => {
        handleOperator(e.target.textContent)
    })
})

function handleOperator(op) {
    if (previousNum === '') {
        previousNum = currentNum
        operatorCheck(op)
    } else if (currentNum === '') {
        operatorCheck(op)
    } else {
        calculate()
        operator = op
        currentDisplayNumber.textContent = ''
        previousDisplayNumber.textContent = previousNum + ' ' + operator
    }
}

function operatorCheck(text) {
    operator = text
    previousDisplayNumber.textContent = previousNum + ' ' + operator
    currentDisplayNumber.textContent = ''
    currentNum = ''
}

function calculate() {
    previousNum = Number(previousNum)
    currentNum = Number(currentNum)

    if (operator === '+') {
        previousNum += currentNum
    } else if (operator === '-') {
        previousNum -= currentNum
    } else if (operator === '×') {
        previousNum *= currentNum
    } else if (operator === '÷') {
        if (currentNum === 0) {
            previousNum = 'error'
            displayResults()
            return

        }
        previousNum /= currentNum
    }
    previousNum = roundNum(previousNum)
    previousNum = previousNum.toString()
    displayResults()
}

function roundNum(num) {
    return Math.round(num * 100000) / 100000
}

function displayResults() {
    if (previousNum.length <= 12) {
        currentDisplayNumber.textContent = previousNum
    } else {
        currentDisplayNumber.textContent = previousNum.slice(0, 12) + '...'
    }
    previousDisplayNumber.textContent = ''
    operator = ''
    currentNum = ''
}

function clearCalculator() {
    currentNum = ''
    previousNum = ''
    operator = ''
    currentDisplayNumber.textContent = ''
    previousDisplayNumber.textContent = ''
}

function addDecimal() {
    if (!currentNum.includes('.')) {
        currentNum += '.'
        currentDisplayNumber.textContent = currentNum
    }
}

function handleKeyPress(e) {
    e.preventDefault()
    if (e.key >= 0 && e.key <= 9) {
        handleNumber(e.key)
    }
    if (e.key === 'Enter' || 
    e.key === '=' && currentNum != '' && previousNum != '') {
        calculate()
    }
    if (e.key === '+' || e.key === '-') {
        handleOperator()
    }
    if (e.key === '*') {
        handleOperator('×')
    }
    if (e.key === '/') {
        handleOperator('÷')
    }
    if (e.key === '.') {
        addDecimal()
    }
    if (e.key === 'Backspace') {
        handleDelete()
    }
}

function handleDelete() {
    if (currentNum != '') {
        currentNum = currentNum.slice(0, -1)
        currentDisplayNumber.textContent = currentNum
    }
}