let currentNumber = '';
let previousNumber = '';
let operation = null;

// Add event listeners for keyboard input
document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(e) {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        setOperation(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        calculate();
    } else if (e.key === 'Escape') {
        clearResult();
    } else if (e.key === '.') {
        appendDecimal();
    }
}

function appendNumber(number) {
    if (currentNumber.length >= 15) return; // Prevent overflow
    currentNumber += number;
    updateResult(currentNumber);
}

function appendDecimal() {
    if (currentNumber.includes('.')) return;
    currentNumber = currentNumber === '' ? '0.' : currentNumber + '.';
    updateResult(currentNumber);
}

function setOperation(op) {
    if (currentNumber === '') {
        if (previousNumber === '') return;
        operation = op;
        return;
    }
    if (previousNumber !== '') calculate();
    operation = op;
    previousNumber = currentNumber;
    currentNumber = '';
}

function calculate() {
    if (previousNumber === '' || currentNumber === '' || operation === null) return;
    let result;
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);
    
    if (isNaN(prev) || isNaN(current)) {
        clearResult();
        return;
    }

    try {
        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) throw new Error('Division by zero');
                result = Math.round((prev / current) * 1000000) / 1000000;
                break;
            default:
                return;
        }
        
        if (!isFinite(result)) throw new Error('Result out of bounds');
        
        updateResult(result);
        previousNumber = result.toString();
        currentNumber = '';
        operation = null;
    } catch (error) {
        updateResult('Error');
        clearResult();
    }
}

function clearResult() {
    currentNumber = '';
    previousNumber = '';
    operation = null;
    updateResult('0');
}

function updateResult(value) {
    const display = document.getElementById('result');
    if (!display) return;
    display.value = value;
}
