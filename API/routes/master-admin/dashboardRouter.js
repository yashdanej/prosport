const express = require('express');
const router = express.Router();
const dashboardController = require('../../controller/master-admin/dashboardController');
const { verifyToken } = require('../../middleware/verifyToken');
// const { verifyToken } = require('../../middleware/verifyToken');

router
    router.get('/', verifyToken, dashboardController.Dashboard);
    router.get('/api-logs', verifyToken, dashboardController.ApiLogs);
    router.get('/users-token', verifyToken, dashboardController.UsersToken);
    router.get('/invoice-paid-unpaid', verifyToken, dashboardController.InvoicePaidUnpaid);

module.exports = router;