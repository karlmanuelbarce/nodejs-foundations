export function square(x) {
    return x * x;
};

export function cube(x) {
    return x * x * x;
};

export function average(arr) {
    const sum = arr.reduce((acc, x) => acc + x, 0);
    return sum / arr.length;
};

export function max(arr) {
    return Math.max(...arr);
};
export default { square, cube, average, max };   