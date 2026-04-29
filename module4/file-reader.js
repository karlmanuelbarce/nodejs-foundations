const { readFile, stat } = require('fs/promises');

const filename = process.argv[2];

if (!filename) {
    console.log('Usage: node file-reader.js <filename>');
    process.exit(1);
}

async function main() {
    try {
        const fileStat = await stat(filename);
        const content = await readFile(filename, 'utf-8');
        console.log('File contents:', content);
        console.log(`File size: ${fileStat.size} bytes`);
        console.log(content.split('\n').length + ' lines');
    }catch (err) {
        console.error('Error reading file:', err.message);
    }
}

main();
