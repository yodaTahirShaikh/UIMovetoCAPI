const fs = require('fs');
const multer = require('multer');
const directory = 'uploads';
const { processData } = require('../helper/movecapihelper.js');

if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });


const uploadCsv = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const file_path = req.file.path;
    let ldap = req.cookies.smacon;

    await fs.readFile(file_path, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file.');
        }
        fs.writeFile(`uploads/${req.file.originalname}`, data, (err) => {
            if (err) {
                return res.status(500).send('Error saving file.');
            }
            // return res.send('File uploaded and saved successfully.');
        });
    });
    await processData(ldap, false);
    await processData(ldap, true);
};

module.exports = { upload, uploadCsv };