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




function blinkNumber() {
    let value = $result.textContent
    $result.textContent = ''

    setTimeout(() => {
        $result.textContent = value
    }, 70)
}



function operatorHandler(operator) {
    valueAfterUseOperator = Number($result.textContent)
    actualOperator = operator
    isFirstTypingAfterUseOperator = true
    blinkNumber()
}

function onPlusButton() {
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
        result = valueAfterUseOperator + Number($result.textContent)
    } else if (actualOperator === Operator.minus) {
        result = valueAfterUseOperator - Number($result.textContent)
    } else if (actualOperator === Operator.multiple) {
        result = valueAfterUseOperator * Number($result.textContent)
    } else if (actualOperator === Operator.division) {
        result = valueAfterUseOperator / Number($result.textContent)
    }

    onTypingNumber(result)

    blinkNumber()
    actualOperator = null
    valueAfterUseOperator = null
}


//функция для вывода цифр на дисплей
function onTypingNumber(number) { 
    
    if (isFirstTypingAfterUseOperator) {
        isFirstTypingAfterUseOperator = false
        $result.textContent = number
        return
    }
    
    let oldValue = $result.textContent + number
    $result.textContent = Number(oldValue)
}



function onShowReset() { 
    $result.textContent = '0'
    blinkNumber()
}



// TODO: добавить фич



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

