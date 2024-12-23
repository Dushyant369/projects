document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  let currentInput = '';
  let operator = '';
  let firstOperand = null;
  let secondOperand = null;

  const clearDisplay = () => {
      currentInput = '';
      operator = '';
      firstOperand = null;
      secondOperand = null;
      display.textContent = '0';
  };

  const calculate = () => {
      secondOperand = parseFloat(currentInput);
      let result;
      if (operator === '+') result = firstOperand + secondOperand;
      else if (operator === '-') result = firstOperand - secondOperand;
      else if (operator === '*') result = firstOperand * secondOperand;
      else if (operator === '/') result = firstOperand / secondOperand;
      else if (operator === '%') result = firstOperand % secondOperand;
      else if (operator === '^') result = Math.pow(firstOperand, secondOperand);

      // Rounding result to 8 decimal places for precision
      result = parseFloat(result.toFixed(8));

      // If the result is too long, display it in scientific notation
      if (result.toString().length > 15) {
        result = result.toExponential(4);
     }

      display.textContent = result;
      currentInput = result.toString();
      operator = '';
  };

  document.querySelectorAll(".number").forEach(btn => {
      btn.addEventListener("click", (e) => {
          if (currentInput === '0' || operator) {
              currentInput = '';
          }
          currentInput += e.target.textContent;
          display.textContent = currentInput;
      });
  });

  document.querySelectorAll(".operator").forEach(btn => {
      btn.addEventListener("click", (e) => {
          if (firstOperand === null) {
              firstOperand = parseFloat(currentInput);
          } else if (operator) {
              calculate();
          }
          operator = e.target.textContent;
          currentInput = '';
      });
  });

  document.getElementById("equals").addEventListener("click", calculate);
  document.getElementById("clear").addEventListener("click", clearDisplay);

  document.getElementById("decimal").addEventListener("click", () => {
      if (!currentInput.includes('.')) {
          currentInput += '.';
          display.textContent = currentInput;
      }
  });

  document.getElementById("mod").addEventListener("click", () => {
      operator = '%';
  });

  document.getElementById("exp").addEventListener("click", () => {
      operator = '^';
  });
});
