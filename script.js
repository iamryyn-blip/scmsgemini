const output = document.querySelector('.output');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let operator = '';
let previousInput = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;

        if (buttonText === 'C') {
            currentInput = '';
            operator = '';
            previousInput = '';
            updateDisplay();
        } else if (buttonText === 'DEL') {
            currentInput = currentInput.slice(0, -1);
            updateDisplay();
        } else if (buttonText === '%') {
            if (currentInput !== '') {
                currentInput = (parseFloat(currentInput) / 100).toString();
                updateDisplay();
            }
        } else if (button.classList.contains('operator') && buttonText !== '=') {
            if (currentInput !== '') {
                if (previousInput !== '') {
                    calculate();
                }
                operator = buttonText;
                previousInput = currentInput;
                currentInput = '';
            }
        } else if (buttonText === '=') {
            if (previousInput !== '' && currentInput !== '') {
                calculate();
                operator = '';
            }
        } else {
            currentInput += buttonText;
            updateDisplay();
        }
    });
});

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
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
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    previousInput = '';
    updateDisplay();
}

function updateDisplay() {
    output.textContent = currentInput || previousInput || '0';
}
