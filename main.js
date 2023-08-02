// Selectors
const resultBlockSelector = '.show-result'
const resetButtonSelector = '.reset'

const buttonsListSelector = '.number-buttons'

const plusButtonSelector = '.btn-plus'
const minusButtonSelector = '.btn-minus'
const multiplyButtonSelector = '.btn-multiply'
const shareButtonSelector = '.btn-division'

const fractionButtonSelector = '.btn-fraction'
const resultButtonSelector = '.btn-result'



// Elements
const $plusButton = document.querySelector(plusButtonSelector)
const $minusButton = document.querySelector(minusButtonSelector)
const $multiplyButton = document.querySelector(multiplyButtonSelector)
const $divisionButton = document.querySelector(shareButtonSelector)

const $fraction = document.querySelector(fractionButtonSelector)
const $resultButtom = document.querySelector(resultButtonSelector)

const $reset = document.querySelector(resetButtonSelector)
const $result = document.querySelector(resultBlockSelector)

const buttonsArray = document.querySelectorAll(buttonsListSelector)



// Variables
const Operator = {
    plus: '+',
    minus: '-',
    multiple: '*',
    division: '/'
}



let valueAfterUseOperator = null
let actualOperator = null

let isFirstTypingAfterUseOperator = false
let nextOperator = false





function blinkNumber() {
    let value = $result.value
    $result.value = ''

    setTimeout(() => {
        $result.value = value
    }, 70)
}




function operatorHandler(operator) {
    valueAfterUseOperator = Number($result.value)
    actualOperator = operator
    isFirstTypingAfterUseOperator = true
    blinkNumber()
}

function onPlusButton() {
    nextOperator = true
    operatorHandler(Operator.plus)
}


function onMinusButton() {
    operatorHandler(Operator.minus)
}


function onMultiplyButton() {
    operatorHandler(Operator.multiple)
}


function onDivisionButton() {
    operatorHandler(Operator.division)
}



function onCalculate() {
    let result
    
    if (actualOperator === Operator.plus) {
        result = valueAfterUseOperator + Number($result.value)
    } else if (actualOperator === Operator.minus) {
        result = valueAfterUseOperator - Number($result.value)
    } else if (actualOperator === Operator.multiple) {
        result = valueAfterUseOperator * Number($result.value)
    } else if (actualOperator === Operator.division) {
        result = valueAfterUseOperator / Number($result.value)
    }
    
    onTypingNumber(result)

    blinkNumber()
    actualOperator = null
    valueAfterUseOperator = null
}



function onTypingNumber(number) { 
    
    if (isFirstTypingAfterUseOperator) {
        isFirstTypingAfterUseOperator = false
        $result.value = number
        return
    }
    
    let oldValue = $result.value + number
    $result.value = Number(oldValue)
}



function onShowReset() { 
    $result.value = '0'
    blinkNumber()
}


// функция отсортировки нежеланных символов (str) меняется на value
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
    onTypingNumber(delNotCorrectValue(value))
}


// TODO: убрать баг



// Event's listeners
$plusButton.addEventListener('click', onPlusButton)
$minusButton.addEventListener('click', onMinusButton)
$multiplyButton.addEventListener('click', onMultiplyButton)
$divisionButton.addEventListener('click', onDivisionButton)

$resultButtom.addEventListener('click', onCalculate)
    
// Numbers buttons
for (let i = 0; i < buttonsArray.length - 1; i++) {

    buttonsArray[i].addEventListener('click', function() {onTypingNumber(i + 1)})
}
const zeroNumberButtonIndex = buttonsArray.length - 1
buttonsArray[zeroNumberButtonIndex].addEventListener('click', function() {onTypingNumber(0)})


$reset.addEventListener('click', onShowReset)
$result.addEventListener('input', onChangeInput)
