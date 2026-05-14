// --- Reading generic types ---

// 1. Promise<User>
// A Promise that, when it resolves, gives you a User object.
// TypeScript knows the resolved value is a User, not just "anything".

// 2. Array<string>
// A list where every item is a string. Same as writing string[].
// TypeScript will error if you try to push a number into it.

// 3. Map<string, number>
// A key-value store where every key is a string and every value is a number.
// e.g. map.get('score') returns number | undefined, not unknown.

// 4. Request<{ id: string }, {}, CreateTaskBody>
// An Express Request where:
//   - req.params has shape { id: string }
//   - req.query is an empty object (unused)
//   - req.body has the shape of CreateTaskBody
// TypeScript uses those three slots to type params, query, and body.

// 5. (items: T[]) => T | undefined
// A function that is generic over T.
// It accepts an array of any one type and returns either an item of that
// same type or undefined. T is inferred from whatever array you pass in.

// --- Writing a generic function ---

function firstItem<T>(items: T[]): T | undefined {
  return items[0];
}

// T is inferred as number — result is number | undefined
const firstNumber = firstItem([10, 20, 30]);
console.log('First number:', firstNumber);

// T is inferred as string — result is string | undefined
const firstWord = firstItem(['apple', 'banana', 'cherry']);
console.log('First word:', firstWord);

// T is inferred as never on an empty array — result is undefined
const nothing = firstItem([]);
console.log('Empty array:', nothing);
