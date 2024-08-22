const axios = require('axios');
const CryptoJS = require('crypto-js');
const moment = require('moment-timezone');
const util = require('util');
const db = require('../../db');
const { verifyToken } = require('../../middleware/verifyToken');
const query = util.promisify(db.query).bind(db);

exports.Dashboard = async (req, res, next) => {
    try {
        // Verify the token and get the user
        const getUser = await verifyToken(req, res, next, { verifyUser: true });
        const [getSelectedUser] = await query("SELECT * FROM users WHERE id = ?", [getUser]);
        
        if (!getSelectedUser?.isAdmin) {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        // Initialize the response object
        let response = {};

        // Query to get new registrations and subscriptions for the current month
        const [subscriptionStats] = await query(`
            SELECT 
                (SELECT COUNT(*) 
                 FROM users 
                 WHERE MONTH(created_at) = MONTH(CURRENT_DATE) 
                 AND YEAR(created_at) = YEAR(CURRENT_DATE)) AS newRegistration,
                
                COUNT(CASE WHEN MONTH(h.created_at) = MONTH(CURRENT_DATE) 
                         AND YEAR(h.created_at) = YEAR(CURRENT_DATE) 
                    THEN 1 END) AS newSubscription,
                
                COUNT(CASE WHEN s.expire_date BETWEEN DATE_FORMAT(CURRENT_DATE, '%Y-%m-01') 
                         AND CURRENT_DATE 
                    THEN 1 END) AS expiredSubscription
            FROM 
                user_subscription_histories h
            JOIN 
                user_subscriptions s
            ON 
                h.user_id = s.userId AND h.plan_id = s.planId
        `);

        // Add the results to the response object
        response.newRegistration = subscriptionStats.newRegistration;
        response.newSubscription = subscriptionStats.newSubscription;
        response.expiredSubscription = subscriptionStats.expiredSubscription;

        
        const { from, to } = req.query;

        // Set default values for from and to dates if not provided
        const today = new Date().toISOString().split('T')[0]; // Gets today's date in 'YYYY-MM-DD' format
        const startDate = from || today;
        const endDate = to || today;

        // Fetch all users with their API hits within the date range
        const usersWithApiHits = await query(`
            SELECT 
                userId, COUNT(*) as apiHits
            FROM 
                api_call_logs
            GROUP BY 
                userId
            ORDER BY 
                apiHits DESC
        `);

        // Fetch day-wise API hits within the date range
        const dayWiseApiHits = await query(`
            SELECT 
                DATE(created_at) as date, COUNT(*) as hits
            FROM 
                api_call_logs
            WHERE 
                DATE(created_at) BETWEEN ? AND ?
            GROUP BY 
                DATE(created_at)
            ORDER BY 
                DATE(created_at) ASC
        `, [startDate, endDate]);

         // Fetch API hits by sportId within the date range
         const apiHitsBySport = await query(`
            SELECT 
                sportId, COUNT(*) as hits
            FROM 
                api_call_logs
            GROUP BY 
                sportId
            ORDER BY 
                hits DESC
        `);

         // Fetch device usage statistics within the date range
        const deviceUsage = await query(`
            SELECT 
                device, COUNT(*) as count
            FROM 
                stored_ip
            GROUP BY 
                device
        `);

        // Categorize devices
        const categorizedDevices = deviceUsage.reduce((acc, item) => {
            let category = categorizeDevice(item.device);
            if (!acc[category]) {
                acc[category] = { count: 0 };
            }
            acc[category].count += item.count;
            return acc;
        }, {});

        // Calculate total counts for percentage calculation
        const totalDeviceCount = Object.values(categorizedDevices).reduce((total, device) => total + device.count, 0);

        // Calculate percentages for each device category
        const deviceUsageWithPercentage = Object.entries(categorizedDevices).map(([device, stats]) => ({
            device,
            count: stats.count,
            percentage: totalDeviceCount > 0 ? ((stats.count / totalDeviceCount) * 100).toFixed(2) : 0
        }));

        // fetch most api endpoint hits
        const mostApiEndpointHits = await query(
            `SELECT 
                TRIM(BOTH '/' FROM all_live_api_endpoint.endpoint) AS normalized_endpoint,
                all_live_api_endpoint.name,
                COUNT(api_call_logs.endpoint) AS count
            FROM all_live_api_endpoint
            LEFT JOIN api_call_logs
                ON TRIM(BOTH '/' FROM api_call_logs.endpoint) = TRIM(BOTH '/' FROM all_live_api_endpoint.endpoint)
            GROUP BY normalized_endpoint, all_live_api_endpoint.name
            ORDER BY count DESC;` // Added ORDER BY clause to sort in descending order
        );

        // Return the users with API hits and day-wise API hits in the response
        return res.status(200).json({
            success: true,
            data: {
                response,
                usersWithApiHits,
                dayWiseApiHits,
                apiHitsBySport,
                deviceUsage: deviceUsageWithPercentage,
                mostApiEndpointHits
            }
        });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

exports.ApiLogs = async (req, res, next) => {
    try {
        const getLogs = await query(`
            SELECT 
                all_live_api_endpoint.name AS endpoint_name,
                api_call_logs.endpoint,
                api_call_logs.failed,
                api_call_logs.created_at
            FROM 
                api_call_logs
            LEFT JOIN 
                all_live_api_endpoint
            ON 
                api_call_logs.endpoint = all_live_api_endpoint.endpoint
            ORDER BY 
                api_call_logs.created_at DESC;`
        )
        return res.status(200).json({success: true, message: "Api logs fetched successfully", data: getLogs})
    } catch (error) {
        console.error("Error fetching api logs data:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

exports.UsersToken = async (req, res, next) => {
    try {
        const getUserTokens = await query("select * from user_subscriptions");
        return res.status(200).json({success: true, message: "Users token fetched successfully", data: getUserTokens});
    } catch (error) {
        console.error("Error fetching api users token data:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

exports.InvoicePaidUnpaid = async (req, res, next) => {
    try {
        const [getUserTokens] = await query("select * from user_subscriptions");
        
        return res.status(200).json({success: true, message: "Users token fetched successfully", data: getUserTokens});
    } catch (error) {
        console.error("Error fetching invoice paid unpaid data:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}