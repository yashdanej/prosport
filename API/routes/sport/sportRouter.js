const express = require('express');
const router = express.Router();
const sportController = require('../../controller/sport/sportController');
const { verifyToken } = require('../../middleware/verifyToken');
const { upload } = require('../../middleware/upload');
const { verifyDomainAndSecretKey } = require('../../middleware/verifyDomainAndSecretKey');

router
    .get("/cricket", verifyToken, sportController.Cricket)

module.exports = router;