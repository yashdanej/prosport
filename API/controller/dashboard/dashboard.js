const axios = require('axios');
const CryptoJS = require('crypto-js');
const moment = require('moment-timezone');
const util = require('util');
const db = require('../../db');
const { verifyToken } = require('../../middleware/verifyToken');
const query = util.promisify(db.query).bind(db);

exports.getApiLogs = async (req, res, next) => {
    try {
        // Verify the token and get the user
        const getUser = await verifyToken(req, res, next, { verifyUser: true });
        
        // Get the user's subscriptions
        const logs = await query("SELECT endpoint, count(*) as count FROM api_call_logs where user_id = ? group by endpoint;", [getUser]);

        // Send the response
        return res.status(200).json({
            status: true,
            data: logs
        });
    } catch (error) {
        console.error("Error fetching API keys:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}