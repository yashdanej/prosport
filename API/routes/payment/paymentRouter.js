const express = require('express');
const router = express.Router();
const paymentController = require('../../controller/payment/paymentController');
const { verifyToken } = require('../../middleware/verifyToken');
const subscriptionCheck = require('../../middleware/subscriptionCheck');
// const { verifyToken } = require('../../middleware/verifyToken');

router
    .post("/", verifyToken, paymentController.Payment)
    .post("/status/:txnId", verifyToken, paymentController.Status)

    router.post('/create-token/:id', verifyToken, paymentController.createToken);
    router.get('/commission', verifyToken, paymentController.GetCommission);
    router.get('/api_key', verifyToken, subscriptionCheck, paymentController.apiKeys);
    router.get('/billing', verifyToken, paymentController.Billing);
    router.get('/subscription', verifyToken, paymentController.Subscription);
    router.post('/update-subscription-status', verifyToken, paymentController.updateSubscriptionStatus);

module.exports = router;