// Calculator state and DOM elements
const state = {
    screen: null,
    buttons: null
  };
  
  // Initialize DOM elements
  function initializeElements() {
    state.screen = document.getElementById('calculator-screen');
    state.buttons = document.querySelectorAll('.btn');
    
    if (!state.screen || !state.buttons) {
      console.error('Required elements not found');
      return false;
    }
    return true;
  }
  
  // Calculator operations
  const operations = {
    clearScreen: () => {
      state.screen.value = '';
    },
    
    backspace: () => {
      state.screen.value = state.screen.value.slice(0, -1);
    },
    
    appendCharacter: (character) => {
      if (character === '√') {
        state.screen.value += 'Math.sqrt(';
      } else {
        state.screen.value += character;
      }
    },
    
    calculateResult: () => {
      try {
        let expression = state.screen.value.replace(
          /Math.sqrt\(([^()]*)$/g,
          'Math.sqrt($1)'
        );
        state.screen.value = eval(expression);
      } catch (error) {
        state.screen.value = 'Error';
        console.error('Calculation error:', error);
      }
    }
  };
  
  // Event handlers
  function handleButtonClick(event) {
    const button = event.target;
    if (!button.matches('.btn')) return;
    
    const value = button.getAttribute('data-value');
    if (!value) return;
    
    switch (value) {
      case 'C':
        operations.clearScreen();
        break;
      case '←':
        operations.backspace();
        break;
      case '=':
        operations.calculateResult();
        break;
      case '√':
        operations.appendCharacter('√');
        break;
      default:
        operations.appendCharacter(value);
        break;
    }
  }
  
  function handleKeyPress(event) {
    const key = event.key;
    
    if ((key >= '0' && key <= '9') || key === '.') {
      operations.appendCharacter(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
      operations.appendCharacter(key);
    } else if (key === 'Enter') {
      operations.calculateResult();
    } else if (key === 'Backspace') {
      operations.backspace();
    } else if (key === 'Escape') {
      operations.clearScreen();
    } else if (key === '^') {
      operations.appendCharacter('**');
    } else if (key === 'r') {
      operations.appendCharacter('√');
    } else if (key === '(' || key === ')') {
      operations.appendCharacter(key);
    }
  }
  
  // Initialize calculator
  function initCalculator() {
    if (!initializeElements()) return;
    
    // Add click listener to the calculator buttons container (event delegation)
    document.querySelector('.calculator-buttons').addEventListener('click', handleButtonClick);
    
    // Add keyboard listener
    document.addEventListener('keydown', handleKeyPress);
  }
  
  // Start the calculator when DOM is fully loaded
  document.addEventListener('DOMContentLoaded', initCalculator);