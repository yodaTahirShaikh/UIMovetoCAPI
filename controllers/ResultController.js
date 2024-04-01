const fs = require('fs');
const multer = require('multer');
const directory = 'results';

if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
}