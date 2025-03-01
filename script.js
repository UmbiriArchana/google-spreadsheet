// Function to parse and evaluate the formula
function evaluateFormula(formula) {
  // Replace cell references (e.g., A1, B2, etc.) with actual cell values
  const cells = document.querySelectorAll('#spreadsheet td[contenteditable="true"]');
  const cellValues = {};

  cells.forEach(cell => {
    const cellId = `R${cell.parentNode.rowIndex}C${cell.cellIndex}`;
    cellValues[cellId] = parseFloat(cell.textContent) || 0; // Store numeric values
  });

  // Replace references like A1, B2, etc., with corresponding values from cellValues
  formula = formula.replace(/[A-D][1-9]/g, match => {
    const row = match[1];
    const col = match[0];
    const colIndex = { 'A': 1, 'B': 2, 'C': 3, 'D': 4 }[col];
    const cellId = `R${row}C${colIndex}`;
    return cellValues[cellId] || 0;
  });

  // Evaluate the formula using JavaScript's eval (basic support for operators +, -, *, /)
  try {
    return eval(formula);
  } catch (error) {
    return "Error in formula";
  }
}

// Event listener for the "Calculate Formula" button
document.getElementById('calculate').addEventListener('click', function () {
  const formula = document.getElementById('formula-bar').value.trim();
  if (formula) {
    const result = evaluateFormula(formula);
    document.getElementById('result').textContent = `Result: ${result}`;
  } else {
    document.getElementById('result').textContent = 'Please enter a formula.';
  }
});
