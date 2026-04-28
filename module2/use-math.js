const {square, cube, average, max} = require('./math-utils.js');

const arr = [1, 2, 3, 4, 5];

console.log(`The square root of 16 is ${square(16)}`);
console.log(`The value of pi is approximately ${cube(3)}`);
console.log(`The average of the array is ${average(arr)}`);
console.log(`The maximum value in the array is ${max(arr)}`);