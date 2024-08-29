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
    router.get('/get-plans', verifyToken, dashboardController.GetPlans);
    router.post('/add-plan', verifyToken, dashboardController.AddPlan);
    router.patch('/deactivate-plan/:planid', verifyToken, dashboardController.DeactivatePlan);
    router.delete('/delete-plan/:planid', verifyToken, dashboardController.DeletePlan);
    router.get('/get-plan-by-id/:planid', verifyToken, dashboardController.GetPlanById);
    router.patch('/update-plan/:planid', verifyToken, dashboardController.UpdatePlan);

module.exports = router;