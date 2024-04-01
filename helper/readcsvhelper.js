const fs = require('fs');
const { parse } = require('csv-parse');

function readCsv(directory, singleFile = false, filename = '') {
    let files = [];
    if (singleFile) {
        files = fs.readdirSync(directory).filter(file => file.startsWith(filename));
    } else {
        files = fs.readdirSync(directory).filter(file => file.endsWith('.csv'));
    }

    const fileName = files[0] || '';
    if (fileName === '') {
        return Promise.resolve([]);
    }

    return new Promise((resolve, reject) => {
        const data = [];
        const parser = parse({ delimiter: ',', columns: true });
        const csvStream = fs.createReadStream(directory + "/" + fileName).pipe(parser);
        csvStream.on('data', (row) => { data.push(row); });
        csvStream.on('end', () => { resolve(data); });
        csvStream.on('error', (err) => { reject(err); });
    });
}

module.exports = { readCsv };