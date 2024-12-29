function clearScreen() {
    document.getElementById('calculator-screen').value = '';
}

function backspace() {
    let screen = document.getElementById('calculator-screen');
    screen.value = screen.value.slice(0, -1);
}

function appendCharacter(character) {
    const screen = document.getElementById('calculator-screen');
    screen.value += character;
}

function appendSquareRoot() {
    const screen = document.getElementById('calculator-screen');
    screen.value += 'Math.sqrt(';
}

function calculateResult() {
    let screen = document.getElementById('calculator-screen');
    try {
        // Automatically close any open parentheses for square root functions
        let expression = screen.value.replace(/Math.sqrt\(([^()]*)$/, 'Math.sqrt($1)');
        screen.value = eval(expression);
    } catch (error) {
        screen.value = 'Error';
    }
}

// Adding event listeners for keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key >= '0' && key <= '9' || key === '.') {
        appendCharacter(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendCharacter(key);
    } else if (key === 'Enter') {
        calculateResult();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Escape') {
        clearScreen();
    } else if (key === '^') {
        appendCharacter('**');
    } else if (key === 'r') {
        appendSquareRoot();
    } else if (key === '(' || key === ')') {
        appendCharacter(key);
    }
});