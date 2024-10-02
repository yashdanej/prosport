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

    
    // plan
    router.get('/get-plans', verifyToken, dashboardController.GetPlans);
    router.post('/add-plan', verifyToken, dashboardController.AddPlan);
    router.patch('/deactivate-plan/:planid', verifyToken, dashboardController.DeactivatePlan);
    router.delete('/delete-plan/:planid', verifyToken, dashboardController.DeletePlan);
    router.get('/get-plan-by-id/:planid', verifyToken, dashboardController.GetPlanById);
    router.patch('/update-plan/:planid', verifyToken, dashboardController.UpdatePlan);
    
    
    // plan features
    router.post('/add-plan-feature', verifyToken, dashboardController.createPlanFeature);
    router.get('/get-plan-features', verifyToken, dashboardController.getPlanFeatures);
    router.get('/get-plan-feature/:id', verifyToken, dashboardController.getPlanFeatureById);
    router.patch('/update-plan-feature/:id', verifyToken, dashboardController.updatePlanFeature);
    router.delete('/delete-plan-feature/:id', verifyToken, dashboardController.deletePlanFeature);


    router.get('/user/:id', verifyToken, dashboardController.GetUser);
    router.get('/user/details/:path/:id?', verifyToken, dashboardController.GetUsers);
    router.patch('/user/change-plan-status/:id', verifyToken, dashboardController.ChangePlanStatus);

    router.patch('/user/:user_id/upgrade-plan/:plan_id', verifyToken, dashboardController.UpgradePlan);

module.exports = router;