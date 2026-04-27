function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

console.log(`2 + 3 = ${add(2, 3)}`);
console.log(`5 - 2 = ${subtract(5, 2)}`);
console.log(`4 * 3 = ${multiply(4, 3)}`);
console.log(`10 / 2 = ${divide(10, 2)}`);