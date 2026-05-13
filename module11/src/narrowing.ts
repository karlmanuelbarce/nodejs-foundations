function describe(value: string | number | boolean): string {
  if (typeof value === 'string') {
    return `String: ${value}`;
  }
  if (typeof value === 'number') {
    return `Number: ${value}`;
  }
  return `Boolean: ${value}`;
}

console.log(describe('Hello'));
console.log(describe(42));
console.log(describe(true));