const express = require('express');
const router = express.Router();
const sportController = require('../../controller/sport/sportController');
const { verifyToken } = require('../../middleware/verifyToken');
const { upload } = require('../../middleware/upload');
const { verifyDomainAndSecretKey } = require('../../middleware/verifyDomainAndSecretKey');
const subscriptionCheck = require('../../middleware/subscriptionCheck');

router
    .get("/cricket", verifyToken, subscriptionCheck, sportController.Cricket)

module.exports = router;