const express = require('express');
const router = express.Router();
const { upload, uploadCsv } = require('../controllers/UploadController.js');
const { loginPage, logIn } = require('../controllers/AuthController.js');
const { getcsvfiles } = require('../controllers/ResultController.js')


// HTTP GET calls

router.route('/').get(loginPage);
router.route('/api/getfiles').get(getcsvfiles);

router.route('/login').post(logIn);

// // HTTP POST calls
router.route('/upload').post(upload.single('csvFile'), uploadCsv);



// // HTTP PUT calls
// router.route('/updateTrade/:portfolioId').put(modifyTrade);

// // HTTP DELETE calls
// router.route('/removeTrade/:portfolioId').delete(deleteTrade);


module.exports = router;