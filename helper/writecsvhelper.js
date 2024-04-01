const fs = require('fs');
const { createObjectCsvWriter } = require('csv-writer');
const { logger } = require('./loggerhelper.js');
let directory = 'result/'

function writeCsv(data, filename) {
    const filePath = directory + filename + '.csv';
    if (!fs.existsSync(filePath)) {
        const csvWriter = createObjectCsvWriter({
            path: filePath,
            header: [
                { id: 'AppID', title: 'App ID' },
                { id: 'AppName', title: 'App Name' },
                { id: 'PhoneNumber', title: 'Phone Number' },
                { id: 'WabaId', title: 'WABA ID' },
                { id: 'PhoneId', title: 'Phone ID' },
                { id: 'Status', title: 'Status' },
                { id: 'Response', title: 'Response' }
            ]
        });
        csvWriter.writeRecords(data)
    } else {
        fs.appendFile(filePath, data.map(obj => Object.values(obj).join(',')).join('\n') + '\n', (err) => {
            if (err) {
                logger(`${filename} | Error appending data to CSV file | ${err} `);
            }
        });
        logger(`${filename} | Data appended to csv file succesfully`);
    }
}


module.exports = { writeCsv }