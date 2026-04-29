const date = require('dayjs');

const now = date();
console.log('Current date and time:', now.format('YYYY-MM-DD HH:mm:ss'));

const futureDate = date().add(7, 'day');
console.log('Date 7 days from now:', futureDate.format('YYYY-MM-DD HH:mm:ss'));

const pastDate = date().subtract(30, 'day');
console.log('Date 30 days ago:', pastDate.format('YYYY-MM-DD HH:mm:ss'));

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
for (let i = 0; i < 7; i++) {
    const day = date().add(i, 'day').day();
    console.log(`In ${i} days, it will be: ${daysOfWeek[day]}`);
}