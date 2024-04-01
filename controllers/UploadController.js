const fs = require('fs');
const multer = require('multer');
const { processData } = require('../helper/movecapihelper.js');

const directory = 'uploads';

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

    fs.readFile(file_path, 'utf-8', async (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file.');
        }
        fs.writeFile(`${directory}/${req.file.originalname}`, data, async (err) => {
            if (err) {
                return res.status(500).send('Error saving file.');
            }
            // await processData(ldap, false);
            // await processData(ldap, true);
            // Display success message using JavaScript
            return res.status(200).sendFile("index.html", { root: './views' });
        });
    });
};


module.exports = { upload, uploadCsv };
