
const resultBlockSelector = '.show-result'
const resetButtonSelector = '.reset'

const buttonsListSelector = '.number-buttons'

const plusButtonSelector = '.btnPlus'
const minusButtonSelector = '.btnMinus'
const multiplyButtonSelector = '.btnMiltiply'
const shareButtonSelector = '.btnDivision'

const fractionButtonSelector = '.btnFraction'
const resultButtonSelector = '.btnResult'


const $plusButton = document.querySelector(plusButtonSelector)
const $minusButton = document.querySelector(minusButtonSelector)
const $multiplyButton = document.querySelector(multiplyButtonSelector)
const $divisionButton = document.querySelector(shareButtonSelector)

const $fraction = document.querySelector(fractionButtonSelector)
const $resultButtom = document.querySelector(resultButtonSelector)

const $reset = document.querySelector(resetButtonSelector)
const $result = document.querySelector(resultBlockSelector)

const buttonsArray = document.querySelectorAll(buttonsListSelector) 



function blinkNumber() {
    let value = $result.value
    $result.value = ''

    setTimeout(() => {
        $result.value = value
    }, 70)
}



const plusOperator = '+'
const minusOperator = '-'
const miltipleOperator = '*'
const divisionOperator = '/'


let valueAfterUseOperator = null
let actualOperator = null       

let isFirstTypingAfterUseOperator = false
let nextOperator = false


function onPlusButton() {
    
    valueAfterUseOperator = Number($result.value)
    actualOperator = plusOperator
    isFirstTypingAfterUseOperator = true
    nextOperator = true
    blinkNumber()
}

$plusButton.addEventListener('click', onPlusButton)

function onMinusButton() {
    valueAfterUseOperator = Number($result.value)
    actualOperator = minusOperator
    isFirstTypingAfterUseOperator = true
    blinkNumber()
}

$minusButton.addEventListener('click', onMinusButton)

function onMiltiplyButton() {
    valueAfterUseOperator = Number($result.value)
    actualOperator = miltipleOperator
    isFirstTypingAfterUseOperator = true
    blinkNumber()
}

$multiplyButton.addEventListener('click', onMiltiplyButton)

function onDivisiomButton() {
    valueAfterUseOperator = Number($result.value)
    actualOperator = divisionOperator
    isFirstTypingAfterUseOperator = true
    blinkNumber()
}

$divisionButton.addEventListener('click', onDivisiomButton)


function onCalculate() {
    if (actualOperator == '+') {
        $result.value = valueAfterUseOperator + Number($result.value)
    } else if (actualOperator == '-') {
        $result.value = valueAfterUseOperator - Number($result.value)
    } else if (actualOperator == '*') {
        $result.value = valueAfterUseOperator * Number($result.value)
    } else if (actualOperator == '/') {
        $result.value = valueAfterUseOperator / Number($result.value)
    }

    blinkNumber()
    actualOperator = null
    valueAfterUseOperator = null
}

$resultButtom.addEventListener('click', onCalculate)


function typingNumber(number) { 
    
    if (isFirstTypingAfterUseOperator) {
        isFirstTypingAfterUseOperator = false
        $result.value = number
        return
    }
    
    let oldValue = $result.value + number
    $result.value = Number(oldValue)
}

for (let i = 0; i < buttonsArray.length - 1; i++) { 
    
    buttonsArray[i].addEventListener('click', function() {typingNumber(i + 1)}) 
}
const zeroNumberButtonIndex = buttonsArray.length - 1 

buttonsArray[zeroNumberButtonIndex].addEventListener('click', function() {typingNumber(0)}) 

function showReset() { 
    $result.value = '0'
    blinkNumber()
}

$reset.addEventListener('click', showReset)


//функция отсортировки нежеланных символов (str) меняется на value
function delNotCorrectValue(str) {
    
    let result = ''

    for (let i = 0; i < str.length; i++) {
  
        if (str[i] < Infinity) {
            result += str[i]
        }  
    }
    return result
}

// функция вывода на дисплей
function onChangeInput() {

    const value = $result.value
    $result.value = delNotCorrectValue(value)
}

$result.addEventListener('input', onChangeInput)

//реализовать минус