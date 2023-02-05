let firstNum = ''
let secondNum = ''
let operator = ''

const digits = document.querySelectorAll('#digit');
const displayLower = document.querySelector('.display-lower')
const displayUpper = document.querySelector('.display-upper')

function getFirstNum() {
    let digit = ''
    digits.forEach(function (dig) {
        dig.addEventListener("click", function () {
            digit = dig.textContent;
            if (firstNum === '' && digit === '') {
                return
            }
            firstNum += digit
            console.log(firstNum)

            displayLower.textContent = firstNum
        });
    });
    return firstNum
}

function clear() {
    const buttonClear = document.querySelector('.button-clear');
    buttonClear.addEventListener('click', function() {
        console.log('CLEAR');
        firstNum = '';
        secondNum = '';
        operator = '';
        displayLower.textContent = '';
        displayUpper.textContent = '';
    })
}

getFirstNum()
clear()
