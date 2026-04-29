const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var square = array.map(x=> x*x);
console.log('Squares:', square);

var evenNumbers = array.filter(x => x % 2 === 0);
console.log('Even numbers:', evenNumbers); 

var sum = array.reduce((acc, x) => acc + x, 0);
console.log('Sum:', sum);

