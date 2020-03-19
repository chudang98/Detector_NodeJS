const express = require('express');

const detectController = require('../controllers/detectController');

const router = express.Router();

router.route('/detectPhone').post(detectController.detectPhone);
router.route('/detectEmail').post(detectController.detectEmail);
router.route('/testcase').post(detectController.testcase);
module.exports = router;
