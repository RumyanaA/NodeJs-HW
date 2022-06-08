const fs = require('fs');
const csv = require('csvtojson');
const csvFilePath = './csv/nodejs-hw1-ex1.csv';
const writerStream = fs.createWriteStream('./nodejs19-hw1-ex2.txt');
async function readFromFile() {
    const jsonArray = await csv({
        noheader: false,
        headers: ['book', 'author', 'amount', 'price']
    }).fromFile(csvFilePath);
    write(jsonArray);
}

function write(data) {
    data.forEach((chunk, index) => {
        try {
            if (index === data.length - 1) {
                writerStream.write(JSON.stringify(chunk), 'UTF8');
                writerStream.end();
                return;
            }
            writerStream.write(JSON.stringify(chunk), 'UTF8');
            writerStream.write('\n', 'UTF8');
        } catch (e) {
            console.error(e.message);
        }
    });
}
readFromFile();
