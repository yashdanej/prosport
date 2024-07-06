const express = require('express');
const router = express.Router();
const paymentController = require('../../controller/payment/paymentController');
const { verifyToken } = require('../../middleware/verifyToken');
// const { verifyToken } = require('../../middleware/verifyToken');

router
    .post("/", verifyToken, paymentController.Payment)
    .post("/status/:txnId", verifyToken, paymentController.Status)

    router.post('/create-token', verifyToken, paymentController.createToken);
    router.get('/api_key', verifyToken, paymentController.apiKeys);
    router.get('/billing', verifyToken, paymentController.Billing);
    router.post('/update-subscription-status', verifyToken, paymentController.updateSubscriptionStatus);

module.exports = router;