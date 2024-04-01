const express = require('express');
const router = express.Router();
const { homepage } = require('../controllers/HomepageController.js');
const { upload, uploadCsv } = require('../controllers/UploadController.js');
const { loginPage, logIn } = require('../controllers/AuthController.js');
const { processDatafalse, processDatatrue } = require('..helper/movecapihelper.js');


// HTTP GET calls
router.route('/').get(loginPage);
router.route('/login').post(logIn);

// // HTTP POST calls
router.route('/upload').post(upload.single('csvFile'), uploadCsv);
router.route('/:name').post(getfile);

// // HTTP PUT calls
// router.route('/updateTrade/:portfolioId').put(modifyTrade);

// // HTTP DELETE calls
// router.route('/removeTrade/:portfolioId').delete(deleteTrade);


module.exports = router;