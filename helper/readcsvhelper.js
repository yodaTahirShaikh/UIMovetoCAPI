const fs = require('fs');
const { parse } = require('csv-parse');

function readCsv(directory) {
    const data = [];
    const files = fs.readdirSync(directory).filter(file => file.endsWith('.csv'));
    const fileName = files[0] || '';
    if (fileName === '') {
        return Promise.resolve([]);
    }
    const csvPromise = new Promise((resolve, reject) => {
        const parser = parse({ delimiter: ',', columns: true });
        const csvStream = fs.createReadStream(directory + "/" + fileName).pipe(parser);
        csvStream.on('data', (row) => { data.push(row); });
        csvStream.on('end', () => { resolve(data); });
        csvStream.on('error', (err) => { reject(err); });
    });

    return csvPromise;
};

module.exports = { readCsv }