export function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

wait(5000).then(() => console.log('Done waiting!'));

async function main() {
    console.log('Waiting for 3 seconds...');
    await wait(3000);
    console.log('Done waiting!');
}

main();

async function maintry() {
    try{
        console.log('Waiting for 3 seconds...');
        await wait(3000);
        console.log('Done waiting!');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

maintry();
