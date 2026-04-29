import { wait } from './my-promise.js';

console.log('Starting parallel tasks...');

async function sequential() {
    console.time('Sequnteial Tasks');
    await wait(1000);
    await wait(1000);
    await wait(1000);
    console.timeEnd('Sequnteial Tasks');

}

async function parallel() {
    console.time('Parallel Tasks');
    await Promise.all([wait(1000), wait(1000), wait(1000)]);
    console.timeEnd('Parallel Tasks');
}

sequential()
parallel()
