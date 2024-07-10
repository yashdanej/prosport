const axios = require('axios');
const CryptoJS = require('crypto-js');
const moment = require('moment-timezone');
const util = require('util');
const db = require('../../db');
const { verifyToken } = require('../../middleware/verifyToken');
const query = util.promisify(db.query).bind(db);

// Function to generate a unique transaction ID
function    generatedTranscId() {
    return 'T' + Date.now();
}

exports.Payment = async (req, res) => {
    try {
        const price = parseFloat(req.body.price);
        const { user_id, phone, name, email } = req.body;

        // Set the values to variables for later use
        this.name = name;
        this.email = email;
        this.user = user_id;
        this.phone = phone;
        this.price = price;

        const data = {
            merchantId: "M224Q2WILUOKS",
            merchantTransactionId: generatedTranscId(),
            merchantUserId: 'MUID' + user_id,
            name: name,
            amount: price * 100,
            redirectUrl: `${process.env.BACKEND_URL}/orders/status/${generatedTranscId()}`,
            redirectMode: "POST",
            mobileNumber: phone,
            paymentInstrument: {
                type: "PAY_PAGE",
            },
        };
        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString("base64");

        const key = "a5f5f59f-be8b-4651-bb80-4e559e644050";
        const keyIndex = 1;
        const string = payloadMain + "/pg/v1/pay" + key;

        const sha256 = CryptoJS.SHA256(string).toString();
        const checksum = sha256 + "###" + keyIndex;

        //const prod_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
        const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";

        const requestData = {
            method: "POST",
            url: prod_URL,
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                "X-VERIFY": checksum,
            },
            data: {
                request: payloadMain,
            },
        };

        axios.request(requestData)
            .then(async function (response) {
                const phonePeTransactionId = response.data.transactionId;
                res.status(201).send({
                    msg: "payment done",
                    status: "success",
                    data: response.data,
                    phonePeTransactionId: phonePeTransactionId,
                });
                console.log("Payment API Response:", response.data);
            })
            .catch(function (error) {
                console.error("Payment API Error:", error.message);
                res.status(500).json({ msg: "Payment Failed", status: "error", error: error.message });
            });
    } catch (e) {
        console.error("Internal Server Error:", e.message);
        res.status(500).json({ msg: "Internal Server Error", status: "error", error: e.message });
    }
}

exports.Status = async (req, res) => {
    try {
        const merchantTransactionId = req.params.txnId;
        const merchantUserId = "M224Q2WILUOKS";  
        const key = "a5f5f59f-be8b-4651-bb80-4e559e644050";  

        const keyIndex = 1;
        const string = `/pg/v1/status/${merchantUserId}/${merchantTransactionId}` + key;
        const sha256 = CryptoJS.SHA256(string).toString();
        const checksum = sha256 + "###" + keyIndex;

        //const URL = `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantUserId}/${merchantTransactionId}`;
        const URL = `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantUserId}/${merchantTransactionId}`;

        const options = {
            method: 'GET',
            url: URL,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum,
                'X-MERCHANT-ID': merchantUserId,
            }
        };

        console.log("Status API Request Options:", options);

        try {
            const response = await axios.request(options);

            if (response.data.data.responseCode === 'SUCCESS') {
               
                // Create a new order instance
                const newOrder = new Order({
                    name: this.name,  
                    phone: this.phone,  
                    email: this.email,  
                    transactionId: merchantTransactionId,
                    paymentStatus: response.data.data.responseCode,
                    price: this.price,  
                    user: this.user, 
                    dateOrdered: Date.now(),
                });

                // Save the new order to the database
                await newOrder.save();

                // Redirect to the success URL
                const url = "http://localhost:4200/success";
                return res.redirect(url);
            } else {
                // Redirect to the failure URL
                const url = `http://localhost:4200/failure`;
                return res.redirect(url);
            }
        } catch (error) {
            console.error("Status API Error:", error.message);
            console.error("Status API Error Response:", error.response.data);
            res.status(500).json({ msg: "Error checking payment status", status: "error", error: error.message });
        }
    } catch (error) {
        console.error("Internal Server Error:", error.message);
        res.status(500).json({ msg: "Internal Server Error", status: "error", error: error.message });
    }
}

// Create Token
exports.createToken = async (req, res, next) => {
    try {
        const id = req.params.id;
        const selectPlan = await query("SELECT * FROM plans WHERE id = ?", [id]);
        const { name, email, expire_date } = req.body;

        // Get user from token or session (assuming verifyToken function handles this)
        const getUser = await verifyToken(req, res, next, { verifyUser: true });

        // Validate input
        if (!name || !email || !expire_date) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Convert expire_date to Indian Standard Time (IST)
        const expireDateIST = moment(expire_date).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');

        // Check if user already has an active subscription
        const getSub = await query("SELECT * FROM user_subscriptions WHERE userId = ?", [getUser]);

        // Flag to track if a new subscription is being created or renewed
        let isNewSubscription = true;
        console.log("getSub", getSub);
        if (getSub.length > 0) {
            // Check if the current subscription is still active
            const currentSubscription = getSub[0];
            const currentDateIST = moment().tz('Asia/Kolkata');
            const subscriptionEndDate = moment(currentSubscription.expire_date).tz('Asia/Kolkata');
            if (currentDateIST.isBefore(subscriptionEndDate)) {
                // If the subscription is still active, send a response indicating that
                return res.status(400).json({ success: false, message: "Already subscribed" });
            }
        }

        console.log("isNewSubscription", isNewSubscription);

        // Proceed to create a new subscription or renew existing subscription
        const createSubscriptionQuery = isNewSubscription
            ? `INSERT INTO user_subscriptions (userId, planId, start_date, expire_date, token) VALUES (?, ?, ?, ?, ?)`
            : `UPDATE user_subscriptions SET planId = ?, start_date = ?, expire_date = ?, token = ? WHERE userId = ?`;

        const startDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        if (isNewSubscription) {
            await query(createSubscriptionQuery, [getUser, id, startDate, expireDateIST, token]);
        } else {
            await query(createSubscriptionQuery, [id, startDate, expireDateIST, token, getUser]);
        }

        // Log subscription history
        const createSubscriptionHistoryQuery = `INSERT INTO user_subscription_histories (user_id, plan_id, subscribe_date, transation_id, amount) VALUES (?, ?, ?, ?, ?)`;
        const subscribeDate = new Date().toISOString().slice(0, 10); // Current date
        const transactionId = null; // Replace with actual transaction ID if available
        const amount = selectPlan[0].amount; // Replace with actual amount if applicable

        await query(createSubscriptionHistoryQuery, [getUser, id, subscribeDate, transactionId, amount]);

        // Calculate and update commission for referrer (5% of amount)
        const referralQuery = 'SELECT referrer_id FROM referrals WHERE referred_id = ?';
        const referralResult = await query(referralQuery, [getUser]);

        if (referralResult.length > 0) {
            const referrerId = referralResult[0].referrer_id;
            const commissionAmount = amount * 0.05; // 5% commission

            // Update referrer's wallet with commission
            const updateWalletQuery = `INSERT INTO wallet (referred_id, referrer_id, commission) VALUES (?, ?, ?)`;
            await query(updateWalletQuery, [getUser, referrerId, commissionAmount]);

            // Optionally, update referrer's commission balance directly if needed
            // const updateCommissionQuery = 'UPDATE users SET commission_balance = commission_balance + ? WHERE id = ?';
            // await query(updateCommissionQuery, [commissionAmount, referrerId]);
        }

        return res.status(200).json({
            success: true,
            response: { user_id: getUser, token },
            message: isNewSubscription ? 'Token Created Successfully' : 'Subscription Renewed Successfully',
        });

    } catch (error) {
        console.error("Error creating token:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Fetch commission
exports.GetCommission = async (req, res, next) => {
    try {
        // Verify the token and get the user
        const getUser = await verifyToken(req, res, next, { verifyUser: true });
        
        // Get the user's subscriptions
        const commissions = await query("SELECT * FROM wallet WHERE referrer_id = ?", [getUser]);
        // Calculate total commission
        let totalCommission = 0;
        commissions.forEach(commission => {
            totalCommission += commission.commission;
        });
        // Send the response
        return res.status(200).json({
            status: true,
            data: commissions,
            totalCommission
        });
    } catch (error) {
        console.error("Error fetching API keys:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Fetch Subscriptions
exports.apiKeys = async (req, res, next) => {
    try {
        // Verify the token and get the user
        const getUser = await verifyToken(req, res, next, { verifyUser: true });
        
        // Get the user's subscriptions
        const plans = await query("SELECT * FROM user_subscriptions WHERE userId = ?", [getUser]);

        // Send the response
        return res.status(200).json({
            status: true,
            data: plans
        });
    } catch (error) {
        console.error("Error fetching API keys:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

// Fetch Billing
exports.Billing = async (req, res, next) => {
    try {
        // Verify the token and get the user
        const getUser = await verifyToken(req, res, next, { verifyUser: true });
        
        // Get the user's subscriptions
        const plans = await query("SELECT * FROM user_subscription_histories WHERE user_id = ?", [getUser]);

        // Send the response
        return res.status(200).json({
            status: true,
            data: plans
        });
    } catch (error) {
        console.error("Error fetching billing:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

// Subscription
exports.Subscription = async (req, res, next) => {
    try {
        // Get the user's subscriptions
        const plans = await query("SELECT * FROM plans");

        // Send the response
        return res.status(200).json({
            status: true,
            data: plans
        });
    } catch (error) {
        console.error("Error fetching Subscription:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

// Update Subscription Status
exports.updateSubscriptionStatus = async (req, res) => {
    try {
        const { id, status } = req.body;

        const updateQuery = `UPDATE user_subscriptions SET status = ? WHERE id = ?`;
        const updateResult = await db.query(updateQuery, [status, id]);

        if (updateResult.affectedRows > 0) {
            return res.status(200).json({
                status: true,
                response: true,
                message: 'Status updated successfully',
            });
        } else {
            return res.status(404).json({
                status: false,
                response: 'Subscription not found in our records',
            });
        }
    } catch (error) {
        console.error("Error updating subscription status:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};
