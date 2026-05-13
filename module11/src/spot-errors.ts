// === INTENTIONAL TYPE ERRORS — spot and fix exercise ===

interface User {
  id: number;
  name: string;
  email: string;
}

// --- Error 1 ---
// TS2322: Type 'string' is not assignable to type 'number'.
// A string literal '42' was assigned to a variable declared as number.
// const count: number = '42';
const count: number = 42;

// --- Error 2 ---
// TS2739: Type '{ name: string; }' is missing the following properties from type 'User': id, email
// Object literal only provides name but User requires id and email too.
// const user: User = { name: 'Ana' };
const user: User = { id: 1, name: 'Ana', email: 'ana@example.com' };

// --- Error 3 ---
// TS2322: Type 'string' is not assignable to type 'number'.
// The return type is declared as number but the function returns a string template literal.
// function greet(name: string): number { return `Hello, ${name}!`; }
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// --- Error 4 ---
// TS2322: Type 'string' is not assignable to type 'number'.
// Array is typed as number[] but contains a string element 'thirty'.
// const scores: number[] = [10, 20, 'thirty'];
const scores: number[] = [10, 20, 30];

// --- Error 5 ---
// TS2322: Type 'number' is not assignable to type 'boolean'.
// The number 1 is truthy in JS but TypeScript's strict mode does not coerce it to boolean.
// const active: boolean = 1;
const active: boolean = true;

console.log(count, user, greet('Ana'), scores, active);
