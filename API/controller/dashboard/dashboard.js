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
        
        // Get the user's API logs grouped by endpoint, removing leading and trailing slashes
        const logs = await query(
            `SELECT 
                TRIM(BOTH '/' FROM endpoint) AS normalized_endpoint, 
                COUNT(*) AS count 
            FROM api_call_logs 
            WHERE userId = ? 
            GROUP BY normalized_endpoint`,
            [getUser]
        );

        // Send the response
        return res.status(200).json({
            status: true,
            data: logs
        });
    } catch (error) {
        console.error("Error fetching API logs:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};


exports.GetApiLogsByUser = async (req, res, next) => {
    try {
        // Verify the token and get the user
        const getUser = await verifyToken(req, res, next, { verifyUser: true });
        
        // Query to get API logs aggregated by created_at
        const quer = `
            SELECT 
                DATE(created_at) AS date,
                COUNT(*) AS call_count
            FROM 
                api_call_logs 
            WHERE 
                userId = ?
            GROUP BY 
                DATE(created_at)
            ORDER BY 
                DATE(created_at) ASC`;

        const logs = await query(quer, [getUser]);

        // Send the response
        return res.status(200).json({
            status: true,
            data: logs
        });
    } catch (error) {
        console.error("Error fetching API logs:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};
