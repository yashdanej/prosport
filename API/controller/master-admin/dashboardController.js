const axios = require('axios');
const CryptoJS = require('crypto-js');
const moment = require('moment-timezone');
const util = require('util');
const db = require('../../db');
const { verifyToken } = require('../../middleware/verifyToken');
const query = util.promisify(db.query).bind(db);
const UAParser = require('ua-parser-js');
const ipinfo = require('ipinfo');
var geoip = require('geoip-lite');
var useragent = require('useragent');

// exports.Dashboard = async (req, res, next) => {
//     try {
//         // Verify the token and get the user
//         const getUser = await verifyToken(req, res, next, { verifyUser: true });
//         const [getSelectedUser] = await query("SELECT * FROM users WHERE id = ?", [getUser]);
        
//         if (!getSelectedUser?.isAdmin) {
//             return res.status(403).json({ success: false, message: "Access denied" });
//         }

//         // Initialize the response object
//         let response = {};

//         // Query to get new registrations and subscriptions for the current month
//         const [subscriptionStats] = await query(`
//             SELECT 
//                 (SELECT COUNT(*) 
//                  FROM users 
//                  WHERE MONTH(created_at) = MONTH(CURRENT_DATE) 
//                  AND YEAR(created_at) = YEAR(CURRENT_DATE)) AS newRegistration,
                
//                 COUNT(CASE WHEN MONTH(h.created_at) = MONTH(CURRENT_DATE) 
//                          AND YEAR(h.created_at) = YEAR(CURRENT_DATE) 
//                     THEN 1 END) AS newSubscription,
                
//                 COUNT(CASE WHEN s.expire_date BETWEEN DATE_FORMAT(CURRENT_DATE, '%Y-%m-01') 
//                          AND CURRENT_DATE 
//                     THEN 1 END) AS expiredSubscription
//             FROM 
//                 user_subscription_histories h
//             JOIN 
//                 user_subscriptions s
//             ON 
//                 h.user_id = s.userId AND h.plan_id = s.planId
//         `);

//         // Add the results to the response object
//         response.newRegistration = subscriptionStats.newRegistration;
//         response.newSubscription = subscriptionStats.newSubscription;
//         response.expiredSubscription = subscriptionStats.expiredSubscription;

        
//         const { from, to } = req.query;

//         const today = new Date().toISOString().split('T')[0]; // Gets today's date in 'YYYY-MM-DD' format

//         // Calculate the date 7 days before today
//         const sevenDaysAgo = new Date();
//         sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
//         const sevenDaysAgoDate = sevenDaysAgo.toISOString().split('T')[0];
        
//         // If 'from' and 'to' are not provided, default to the last 7 days
//         const startDate = from || sevenDaysAgoDate;
//         const endDate = to || today;

//         // Fetch all users with their API hits within the date range
//         const usersWithApiHits = await query(`
//             SELECT 
//                 a.userId, u.name, u.lastname, u.image, COUNT(*) as apiHits
//             FROM 
//                 api_call_logs a
//             left join users u
//                 on a.userId = u.id
//             GROUP BY 
//                 userId
//             ORDER BY 
//                 apiHits DESC
//         `);

//         // Fetch day-wise API hits within the date range
//         const dayWiseApiHits = await query(`
//             SELECT 
//                 DATE(created_at) as date, COUNT(*) as hits
//             FROM 
//                 api_call_logs
//             WHERE 
//                 DATE(created_at) BETWEEN ? AND ?
//             GROUP BY 
//                 DATE(created_at)
//             ORDER BY 
//                 DATE(created_at) ASC
//         `, [startDate, endDate]);

//          // Fetch API hits by sportId within the date range
//          const apiHitsBySport = await query(`
//             SELECT 
//                 s.id as sportId, 
//                 s.name, 
//                 COUNT(a.sportId) as hits,
//                 ROUND((COUNT(a.sportId) / totalHits.total) * 100, 2) as percentage
//             FROM 
//                 sports s
//             LEFT JOIN 
//                 api_call_logs a ON s.id = a.sportId
//             CROSS JOIN 
//                 (SELECT COUNT(*) as total FROM api_call_logs) as totalHits
//             GROUP BY 
//                 s.id, s.name, totalHits.total
//             ORDER BY 
//                 hits DESC
//         `);

//          // Fetch device usage statistics within the date range
//         const deviceUsage = await query(`
//             SELECT 
//                 device, COUNT(*) as count
//             FROM 
//                 stored_ip
//             GROUP BY 
//                 device
//         `);

//         // Categorize devices
//         const categorizedDevices = deviceUsage.reduce((acc, item) => {
//             let category = categorizeDevice(item.device);
//             if (!acc[category]) {
//                 acc[category] = { count: 0 };
//             }
//             acc[category].count += item.count;
//             return acc;
//         }, {});

//         // Calculate total counts for percentage calculation
//         const totalDeviceCount = Object.values(categorizedDevices).reduce((total, device) => total + device.count, 0);

//         // Calculate percentages for each device category
//         const deviceUsageWithPercentage = Object.entries(categorizedDevices).map(([device, stats]) => ({
//             device,
//             count: stats.count,
//             percentage: totalDeviceCount > 0 ? ((stats.count / totalDeviceCount) * 100).toFixed(2) : 0
//         }));

//         // fetch most api endpoint hits
//         const mostApiEndpointHits = await query(`
//             SELECT 
//                 TRIM(BOTH '/' FROM ale.endpoint) AS normalized_endpoint,
//                 ale.name,
//                 COUNT(acl.endpoint) AS count,
//                 ROUND((COUNT(acl.endpoint) / totalHits.total) * 100, 2) AS percentage
//             FROM 
//                 all_live_api_endpoint ale
//             LEFT JOIN 
//                 api_call_logs acl ON TRIM(BOTH '/' FROM acl.endpoint) = TRIM(BOTH '/' FROM ale.endpoint)
//             CROSS JOIN 
//                 (SELECT COUNT(*) as total FROM api_call_logs) AS totalHits
//             GROUP BY 
//                 normalized_endpoint, ale.name, totalHits.total
//             ORDER BY 
//                 count DESC;
//         `);

//         // Return the users with API hits and day-wise API hits in the response
//         return res.status(200).json({
//             success: true,
//             data: {
//                 response,
//                 usersWithApiHits,
//                 dayWiseApiHits,
//                 apiHitsBySport,
//                 deviceUsage: deviceUsageWithPercentage,
//                 mostApiEndpointHits
//             }
//         });
//     } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//         return res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// };

exports.Dashboard = async (req, res, next) => {
    try {
        // Verify the token and get the user
        const getUser = await verifyToken(req, res, next, { verifyUser: true });
        const [getSelectedUser] = await query("SELECT * FROM users WHERE id = ?", [getUser]);

        if (!getSelectedUser?.isAdmin) {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        const { from, to } = req.query;

        // Initialize the response object
        let response = {};

        // Fetch today's date and the date 7 days ago for default range
        const today = new Date().toISOString().split('T')[0];
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const sevenDaysAgoDate = sevenDaysAgo.toISOString().split('T')[0];

        // Use provided date range or default to the last 7 days
        const startDate = from || sevenDaysAgoDate;
        const endDate = to || today;

        // Query to get new registrations and subscriptions for the date range
        const [subscriptionStats] = await query(`
            SELECT 
                (SELECT COUNT(*) 
                 FROM users 
                 WHERE DATE(created_at) BETWEEN ? AND ?) AS newRegistration,
                
                COUNT(CASE WHEN DATE(h.created_at) BETWEEN ? AND ? THEN 1 END) AS newSubscription,
                
                COUNT(CASE WHEN s.expire_date BETWEEN ? AND ? THEN 1 END) AS expiredSubscription
            FROM 
                user_subscription_histories h
            JOIN 
                user_subscriptions s ON h.user_id = s.userId AND h.plan_id = s.planId
        `, [startDate, endDate, startDate, endDate, startDate, endDate]);

        // Add the results to the response object
        response.newRegistration = subscriptionStats.newRegistration;
        response.newSubscription = subscriptionStats.newSubscription;
        response.expiredSubscription = subscriptionStats.expiredSubscription;

        // Fetch all users with their API hits within the date range
        const usersWithApiHits = await query(`
            SELECT 
                a.userId, u.name, u.lastname, u.image, COUNT(*) as apiHits
            FROM 
                api_call_logs a
            LEFT JOIN 
                users u ON a.userId = u.id
            WHERE 
                DATE(a.created_at) BETWEEN ? AND ?
            GROUP BY 
                a.userId
            ORDER BY 
                apiHits DESC
        `, [startDate, endDate]);

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
                s.id as sportId, 
                s.name, 
                COUNT(a.sportId) as hits,
                ROUND((COUNT(a.sportId) / totalHits.total) * 100, 2) as percentage
            FROM 
                sports s
            LEFT JOIN 
                api_call_logs a ON s.id = a.sportId
            CROSS JOIN 
                (SELECT COUNT(*) as total FROM api_call_logs WHERE DATE(created_at) BETWEEN ? AND ?) as totalHits
            WHERE 
                DATE(a.created_at) BETWEEN ? AND ?
            GROUP BY 
                s.id, s.name, totalHits.total
            ORDER BY 
                hits DESC
        `, [startDate, endDate, startDate, endDate]);

        // Fetch device usage statistics within the date range
        const deviceUsage = await query(`
            SELECT 
                device, COUNT(*) as count
            FROM 
                stored_ip
            WHERE 
                DATE(created_at) BETWEEN ? AND ?
            GROUP BY 
                device
        `, [startDate, endDate]);

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

        // Fetch most API endpoint hits within the date range
        const mostApiEndpointHits = await query(`
            SELECT 
                TRIM(BOTH '/' FROM ale.endpoint) AS normalized_endpoint,
                ale.name,
                COUNT(acl.endpoint) AS count,
                ROUND((COUNT(acl.endpoint) / totalHits.total) * 100, 2) AS percentage
            FROM 
                all_live_api_endpoint ale
            LEFT JOIN 
                api_call_logs acl ON TRIM(BOTH '/' FROM acl.endpoint) = TRIM(BOTH '/' FROM ale.endpoint)
            CROSS JOIN 
                (SELECT COUNT(*) as total FROM api_call_logs WHERE DATE(created_at) BETWEEN ? AND ?) AS totalHits
            WHERE 
                DATE(acl.created_at) BETWEEN ? AND ?
            GROUP BY 
                normalized_endpoint, ale.name, totalHits.total
            ORDER BY 
                count DESC
        `, [startDate, endDate, startDate, endDate]);

        // Return the data in the response
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


// Helper function to categorize devices based on user agent
function categorizeDevice(userAgent) {
    console.log("userAgent", userAgent);
    
    if (userAgent.includes("Windows")) {
        console.log("Windows");
        return "Windows,#C7253E";
    }
    if (userAgent.includes("Linux")) {
        console.log("Linux");

        return "Linux,#125B9A";
    }
    if (userAgent.includes("Macintosh")) {
        console.log("Macintosh");

        return "Mac,#7C00FE";
    }
    if (userAgent.includes("Android") || userAgent.includes("Mobile")) {
        console.log("Android Mobile");

        return "Mobile,#F9E400";
    }
    if (userAgent.includes("iPhone") || userAgent.includes("iPad")) {
        console.log("iPhone iPad");

        return "Mobile,#0D7C66";
    }       
    console.log("Other");
    return "Other,#FF8A8A";
}

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
        const weeklyData = await query(`
            SELECT 
                WEEK(created_at, 1) AS week_number,
                SUM(CASE WHEN failed = 0 THEN 1 ELSE 0 END) AS successful_count,
                SUM(CASE WHEN failed = 1 THEN 1 ELSE 0 END) AS failed_count
            FROM 
                api_call_logs
            WHERE 
                created_at >= DATE_SUB(CURDATE(), INTERVAL 2 WEEK)
            GROUP BY 
                WEEK(created_at, 1)
            ORDER BY 
                WEEK(created_at, 1) DESC;
        `);

        // Destructure the result to get current and previous week data
        const [currentWeek, lastWeek] = weeklyData;

        // Function to calculate percentage change
        const calculatePercentageChange = (current, previous) => {
            if (!previous || previous === 0) return 0;
            return ((current - previous) / previous) * 100;
        };

        // Calculate percentage changes
        const successPercentageChange = calculatePercentageChange(currentWeek.successful_count, lastWeek?.successful_count);
        const failedPercentageChange = calculatePercentageChange(currentWeek.failed_count, lastWeek?.failed_count);

       // Structure the response
       return res.status(200).json({
            success: true,
            message: "API logs fetched successfully",
            data: {
                getLogs,
                successfulCount: currentWeek.successful_count,
                failedCount: currentWeek.failed_count,
                successPercentageChange: successPercentageChange.toFixed(2),
                failedPercentageChange: failedPercentageChange.toFixed(2)
            }
        });
    } catch (error) {
        console.error("Error fetching api logs data:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

exports.UsersToken = async (req, res, next) => {
    try {
        // Query for active/inactive counts and percentages
        const countQuery = `
            SELECT 
                SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) AS active_count,
                SUM(CASE WHEN status = 0 THEN 1 ELSE 0 END) AS inactive_count,
                ROUND(
                    (SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) / COUNT(*)) * 100, 
                    2
                ) AS active_percentage,
                ROUND(
                    (SUM(CASE WHEN status = 0 THEN 1 ELSE 0 END) / COUNT(*)) * 100, 
                    2
                ) AS inactive_percentage
            FROM user_subscriptions
            WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
        `;

        // Query to fetch all data for the last 7 days
        const dataQuery = `
            SELECT * 
            FROM user_subscriptions`;

        // Execute both queries
        const [countResult] = await query(countQuery);
        const dataResult = await query(dataQuery);

        // Return combined response
        return res.status(200).json({
            success: true,
            message: "Users token fetched successfully",
            data: {
                count: countResult,  // Active/inactive count and percentage
                records: dataResult  // List of user subscription records
            }
        });
    } catch (error) {
        console.error("Error fetching API users token data:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


exports.InvoicePaidUnpaid = async (req, res, next) => {
    try {
        // Query to fetch table records with necessary columns
        const recordsQuery = `
            SELECT 
                ush.id,
                u.name,
                u.company_name AS company,
                ush.subscribe_date AS date,
                CASE 
                    WHEN su.status = 0 THEN 'Cancel'
                    WHEN ush.amount = 0 THEN 'Free'
                    WHEN ush.amount > 0 THEN 'Paid'
                    ELSE 'Generated'
                END AS status,
                ush.amount
            FROM user_subscription_histories ush
            JOIN users u ON u.id = ush.user_id
            JOIN plans p ON p.id = ush.plan_id
            JOIN user_subscriptions su ON su.userId = u.id; 
        `;

        // Query to fetch invoice summary
        const summaryQuery = `
            SELECT 
                COUNT(*) AS total_invoices,
                SUM(CASE WHEN su.status = 0 THEN 1 ELSE 0 END) AS cancel_invoices,
                SUM(CASE WHEN su.status = 0 THEN 0 ELSE 0 END) AS cancel_amount,
                SUM(CASE WHEN ush.amount > 0 THEN 1 ELSE 0 END) AS paid_invoices,
                SUM(CASE WHEN ush.amount > 0 THEN ush.amount ELSE 0 END) AS paid_amount,
                SUM(CASE WHEN ush.amount = 0 THEN 1 ELSE 0 END) AS free_invoices,
                SUM(CASE WHEN ush.amount = 0 THEN ush.amount ELSE 0 END) AS free_amount
            FROM user_subscription_histories ush
            JOIN user_subscriptions su ON su.userId = ush.user_id;
        `;

        // Execute both queries
        const recordsResult = await query(recordsQuery);
        const [summaryResult] = await query(summaryQuery);

        // Return combined response
        return res.status(200).json({
            success: true,
            message: "Invoice data fetched successfully",
            data: {
                records: recordsResult,  // List of subscription records
                summary: summaryResult   // Summary of invoices
            }
        });
    } catch (error) {
        console.error("Error fetching invoice paid unpaid data:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



exports.GetPlans = async (req, res) => {
    try {
        const getPlans = await query("select * from plans");
        return res.status(200).json({success: true, message: "Plans fetched successfully", data: getPlans});
    } catch (error) {
        console.error("Error fetching GetPlans data:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

exports.AddPlan = async (req, res) => {
    const {name, api_call_count, amount, validity_number, validity_time} = req.body;
    const api_call = `${api_call_count} per month`;
    const api_calls = 100000;
    const validity = `${validity_number} ${validity_time}`;
    console.log("validity", validity);
    const addPlan = await query("insert into plans set ?", {name, api_call, api_calls, amount, validity});
    const SelectInsertedData = await query("select * from plans where id = ?", [addPlan.insertId]);
    return res.status(201).json({success: true, message: "Plan added successfully", data: SelectInsertedData});
}

exports.GetPlanById = async (req, res) => {
    try {
        const {planid} = req.params;
        const getPlans = await query("select * from plans where id = ?", [planid]);
        return res.status(200).json({success: true, message: "Plan fetched successfully", data: getPlans});
    } catch (error) {
        console.error("Error fetching GetPlans data:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

exports.DeactivatePlan = async (req, res) => {
    try {
        const {planid} = req.params;
        await query("update plans set status = 0 where id = ?", [planid]);
        return res.status(200).json({success: true, message: "Plan deactivated successfully", data: getPlans});
    } catch (error) {
        console.error("Error fetching GetPlans data:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

exports.DeletePlan = async (req, res) => {
    try {
        const {planid} = req.params;
        await query("delete from plans where id = ?", [planid]);
        return res.status(200).json({success: true, message: "Plan deleted successfully"});
    } catch (error) {
        console.error("Error fetching GetPlans data:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


exports.UpdatePlan = async (req, res) => {
    try {
        const { planid } = req.params;
        const { name, api_call_count, amount, validity_number, validity_time } = req.body;

        // Input validation
        if (!name || !api_call_count || !validity_number || !validity_time) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const api_call = `${api_call_count} per month`;
        const api_calls = 100000;  // Update this if it needs to be dynamic
        const validity = `${validity_number} ${validity_time}`;

        // Update the plan in the database
        await query("UPDATE plans SET ? WHERE id = ?", [{ name, api_call, api_calls, amount, validity }, planid]);

        // Fetch the updated plan to return in response
        const updatedPlan = await query("SELECT * FROM plans WHERE id = ?", [planid]);

        return res.status(200).json({ success: true, message: "Plan updated successfully", data: updatedPlan });
    } catch (error) {
        console.error("Error updating plan:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const getLocationFromIP = async (ip) => {
    try {
        // Replace with your IP Geolocation API endpoint and key
        const response = await fetch(`https://ipinfo.io/${ip}?token=6a55251e104cac`);
        const locationData = await response.json();
        return {
            city: locationData.city || 'Unknown',
            state: locationData.region || 'Unknown',
            country: locationData.country || 'Unknown'
        };
    } catch (error) {
        console.error('Error fetching location:', error);
        return { city: 'Unknown', state: 'Unknown', country: 'Unknown' };
    }
};

const requiredFields = [
    'name',
    'lastname',
    'email',
    'image',
    'location',
    'phone',
    'address',
    'city',
    'country',
    'company_name',
    'aboutcompany',
];

exports.GetUser = async (req, res) => {
    const { id } = req.params;
    try {
        const getUser = await query('SELECT * FROM users WHERE id = ?', [id]);

        if (!getUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Calculate profile completeness percentage
        const filledFields = requiredFields.filter((field) => getUser[0][field] !== null && getUser[0][field] !== '');
        const profileCompletion = Math.round((filledFields.length / requiredFields.length) * 100);
        getUser.push({'profileCompletion': profileCompletion});
        return res.status(200).json({
            success: true,
            message: 'User fetched successfully',
            data: getUser,
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.GetUsers = async (req, res) => {
    const {path, id = null} = req.params;
    console.log("path", path);
    console.log("in");
    try {
        if(path === "users"){
            
            const getAllUsers = await query("select name, lastname, company_name, id, status, created_at from users");
            return res.status(200).json({ success: true, message: "Users fetched successfully", data: getAllUsers });
        }else if(path === "security"){
           // Fetch IP and device details from the database
           const storedIPs = await query("SELECT ip_address, device, created_at FROM stored_ip WHERE user_id = ?", [id]);

           // Process each entry to get location and user agent details
           const processedData = await Promise.all(
               storedIPs.map(async (entry) => {
                   const { ip_address, device, created_at } = entry;
                    
                   // Get location details from IP address
                //    const location = await getLocationFromIP(ip_address);
                   var ip = "207.97.227.239";
                   var geo = geoip.lookup(ip_address);
                    let city = geo?.city || 'Unknown';
                    let state = geo?.region || 'Unknown';
                    let country = geo?.country || 'Unknown';
                   // Parse user agent to get device and browser details
                   const agent = useragent.parse(device);
                   console.log("agent", agent);
                   
                   const browser = agent.toAgent(); // e.g., "Chrome 127.0.0.0"
                   const os = agent.os.toString(); // e.g., "Windows 10.0"
                   const deviceType = agent.device.toString(); // e.g., "Nexus 5"

                   return {
                       ip: ip_address,
                       city: city,
                       state: state,
                       country: country,
                       browser: browser,
                       os: os,
                       device: deviceType,
                       created_at: created_at
                   };
               })
           );

           return res.status(200).json({
               success: true,
               message: "Security data fetched successfully",
               data: processedData,
           });
        }else if(path === 'billing-statements'){
            let data = [];
            const getCurrentPlan = await query(
                `SELECT s.*, p.*, s.status as status,
                        DATEDIFF(s.expire_date, CURDATE()) AS days_left, 
                        DATEDIFF(s.expire_date, s.start_date) AS total_days,
                        DATEDIFF(CURDATE(), s.start_date) AS days_used,
                        ROUND((DATEDIFF(CURDATE(), s.start_date) / DATEDIFF(s.expire_date, s.start_date)) * 100, 2) AS days_used_percentage
                 FROM user_subscriptions s 
                 INNER JOIN plans p ON s.planId = p.id 
                 WHERE s.userId = ?`, 
                [id]
            );

            data.push({'current_plan': getCurrentPlan})

            const getAllInvoicesAndBillingHistory = await query(`
                select u.*, user.name as firstname, user.lastname, user.email, user.address, user.phone, p.* from user_subscription_histories u
                inner join plans p on u.plan_id = p.id
                INNER JOIN users user ON u.user_id = user.id 
                where user_id = ? order by u.subscribe_date desc;
            `, [id])
            data.push({'invoices_and_billing_history': getAllInvoicesAndBillingHistory});
            return res.status(200).json({ success: true, message: "Data fetched successfully", data: data});
        }else if(path === 'referrals'){
            let data = [];
            const user = await query("select reffer_code from users where id = ?", [id]);
            // const commissions = await query("SELECT * FROM wallet WHERE referrer_id = ?", [getUser]);
            const refferers = await query(`
                SELECT 
                  u.name,
                  u.lastname, 
                  u.email,
                  MAX(w.commission) AS commission,  -- Use MAX() to avoid grouping errors
                  r.id, 
                  r.created_at 
                FROM 
                  referrals r
                INNER JOIN 
                  users u ON u.id = r.referred_id  -- Get referred users
                LEFT JOIN 
                  wallet w ON w.referrer_id = r.referrer_id  -- Avoid duplicate rows with LEFT JOIN
                WHERE 
                  r.referrer_id = ?  -- Get records referred by the provided id
                GROUP BY 
                  r.id, u.name, u.lastname, r.created_at  -- Include all non-aggregated fields
                ORDER BY 
                  r.id DESC
              `, [id]);

                const commissions = await query("SELECT * FROM wallet WHERE referrer_id = ?", [id]);
                // Calculate total commission
                let totalCommission = 0;
                commissions.forEach(commission => {
                    totalCommission += commission.commission;
                });
                // // Send the response
                // return res.status(200).json({
                //     status: true,
                //     data: {
                //         reffered: commissions.length,
                //         totalCommission
                //     },
                // });
              data.push({
                    reffered_and_earned: {
                        reffered: commissions.length, 
                        earned: totalCommission
                    }, 
                    refferers: refferers, 
                    user
                })
            return res.status(200).json({ success: true, message: "Data fetched successfully", data: data});
        }else if(path === 'api_keys'){
            const getApiKey = await query(`
                select u.id as userid, u.company_domain, u.secret_key, s.id as subscriptionid, s.token, s.status, s.start_date, s.expire_date
                from users u
                inner join user_subscriptions s
                on s.userId = u.id
                where u.id = ?
            `, [id]);
            return res.status(200).json({ success: true, message: "Data fetched successfully", data: getApiKey});
        }else{
            return res.status(200).json({ success: true, message: "No path found"});
        }
    } catch (error) {
        console.error("Error updating plan:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

exports.ChangePlanStatus = async (req, res) => {
    const { id } = req.params;
    try {
        const [getSub] = await query("select * from user_subscriptions where userId = ?", [id]);
        const status = getSub.status == 1 ? 0 : 1;
        await query("update user_subscriptions set status = ? where userId = ?", [status, id]);
        return res.status(200).json({
            success: true,
            message: `Subscription ${status?"resume":"cencelled"} successfully`,
            data: status
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.UpgradePlan = async (req, res) => {
    const { user_id, plan_id } = req.params;
    try {
        const [getPlan] = await query("select * from plans where id = ?", [plan_id]);
        const startDate = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
        const validity = getPlan.validity;
        // Calculate expiry date based on the validity
        const date = moment(new Date());
        let expireDate;
        if (validity.includes('days')) {
            const days = parseInt(validity);
            expireDate = date.add(days, 'days');
        } else if (validity.includes('months')) {
            const months = parseInt(validity);
            expireDate = date.add(months, 'months');
        }
        const expireDateIST = moment(expireDate).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
        await query("update user_subscriptions set start_date = ?, expire_date = ?, api_hits = ?, status = ?, created_at = ?, updated_at = ?, planId = ? where userId = ?", [startDate, expireDateIST, 0, 1, startDate, startDate, plan_id, user_id]);
        await query("INSERT INTO user_subscription_histories (user_id, plan_id, amount, subscribe_date, created_at) VALUES (?, ?, ?, ?, ?)", [user_id, plan_id, getPlan.amount, startDate, startDate]);

        return res.status(200).json({
            success: true,
            message: "Plan changed successfully"
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// features

exports.createPlanFeature = async (req, res) => {
    const { name, plan_id } = req.body;
    try {
        const createdAt = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
        const feature = await query("INSERT INTO plan_features (name, plan_id, created_at, updated_at) VALUES (?, ?, ?, ?)", [name, plan_id, createdAt, createdAt]);
        const data = await query("select * from plan_features where id = ?", [feature.insertId]);
        return res.status(201).json({ success: true, message: 'Plan feature created successfully', data: data });
    } catch (error) {
        console.error('Error creating plan feature:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.getPlanFeatures = async (req, res) => {
    try {
        const planFeatures = await query("SELECT * FROM plan_features");
        
        return res.status(200).json({
            success: true,
            data: planFeatures
        });
    } catch (error) {
        console.error('Error fetching plan features:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.getPlanFeatureById = async (req, res) => {
    const { id } = req.params;
    try {
        const [planFeature] = await query("SELECT * FROM plan_features WHERE id = ?", [id]);
        if (!planFeature) {
            return res.status(404).json({ success: false, message: 'Plan feature not found' });
        }
        return res.status(200).json({ success: true, data: planFeature });
    } catch (error) {
        console.error('Error fetching plan feature:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.updatePlanFeature = async (req, res) => {
    const { id } = req.params;
    const { name, plan_id } = req.body;
    try {
        const updatedAt = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
        await query("UPDATE plan_features SET name = ?, plan_id = ?, updated_at = ? WHERE id = ?", [name, plan_id, updatedAt, id]);
        const data = await query("select * from plan_features where id = ?", [id]);
        return res.status(200).json({ success: true, message: 'Plan feature updated successfully', data });
    } catch (error) {
        console.error('Error updating plan feature:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.deletePlanFeature = async (req, res) => {
    const { id } = req.params;
    try {
        await query("DELETE FROM plan_features WHERE id = ?", [id]);
        return res.status(200).json({ success: true, message: 'Plan feature deleted successfully' });
    } catch (error) {
        console.error('Error deleting plan feature:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
