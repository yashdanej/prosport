const express = require('express');
const router = express.Router();
const dashboardController = require('../../controller/dashboard/dashboard');
const { verifyToken } = require('../../middleware/verifyToken');
// const { verifyToken } = require('../../middleware/verifyToken');

router
    router.get('/api_key', verifyToken, dashboardController.getApiLogs);
    router.get('/api_log_user', verifyToken, dashboardController.GetApiLogsByUser);

module.exports = router;