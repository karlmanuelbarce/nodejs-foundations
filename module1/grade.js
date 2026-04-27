
function getGrade(score) {
    if (score >= 90) {
        return 'A';
    } else if (score >= 80) {
        return 'B';
    } else if (score >= 70) {
        return 'C';
    } else if (score >= 60) {
        return 'D';
    } else {
        return 'F';
    }
}

console.log(getGrade(95)); // Output: A
console.log(getGrade(85)); // Output: B
console.log(getGrade(75)); // Output: C
console.log(getGrade(65)); // Output: D
console.log(getGrade(55)); // Output: F 
module.exports = getGrade;