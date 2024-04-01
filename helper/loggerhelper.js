const fs = require('fs');
const path = require('path');

function logger(message) {
    const currentDate = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
    const logFileName = `${currentDate}.log`;
    const logFilePath = path.join('logs', logFileName); // Assuming logs are stored in a 'logs' directory
    const logMessage = `${new Date().toISOString()} - ${message}\n`;

    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
};

module.exports = { logger }