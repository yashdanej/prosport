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

        const today = new Date().toISOString().split('T')[0]; // Gets today's date in 'YYYY-MM-DD' format

        // Calculate the date 7 days before today
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const sevenDaysAgoDate = sevenDaysAgo.toISOString().split('T')[0];
        
        // If 'from' and 'to' are not provided, default to the last 7 days
        const startDate = from || sevenDaysAgoDate;
        const endDate = to || today;

        // Fetch all users with their API hits within the date range
        const usersWithApiHits = await query(`
            SELECT 
                a.userId, u.name, u.lastname, u.image, COUNT(*) as apiHits
            FROM 
                api_call_logs a
            left join users u
                on a.userId = u.id
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
                s.id as sportId, 
                s.name, 
                COUNT(a.sportId) as hits,
                ROUND((COUNT(a.sportId) / totalHits.total) * 100, 2) as percentage
            FROM 
                sports s
            LEFT JOIN 
                api_call_logs a ON s.id = a.sportId
            CROSS JOIN 
                (SELECT COUNT(*) as total FROM api_call_logs) as totalHits
            GROUP BY 
                s.id, s.name, totalHits.total
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
                (SELECT COUNT(*) as total FROM api_call_logs) AS totalHits
            GROUP BY 
                normalized_endpoint, ale.name, totalHits.total
            ORDER BY 
                count DESC;
        `);

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
                    WHEN ush.amount = 0 THEN 'Free'
                    WHEN ush.amount IS NOT NULL THEN 'Paid'
                    ELSE 'Cancel'
                END AS status,
                ush.amount
            FROM user_subscription_histories ush
            JOIN users u ON u.id = ush.user_id
            JOIN plans p ON p.id = ush.plan_id;
        `;

        // Query to fetch invoice summary
        const summaryQuery = `
            SELECT 
                COUNT(*) AS total_invoices,
                SUM(CASE WHEN ush.amount > 0 THEN 1 ELSE 0 END) AS paid_invoices,
                SUM(CASE WHEN ush.amount > 0 THEN ush.amount ELSE 0 END) AS paid_amount,
                SUM(CASE WHEN ush.amount = 0 THEN 1 ELSE 0 END) AS free_invoices,
                SUM(CASE WHEN ush.amount = 0 THEN ush.amount ELSE 0 END) AS free_amount,
                SUM(CASE WHEN ush.amount IS NULL THEN 1 ELSE 0 END) AS cancel_invoices,
                SUM(CASE WHEN ush.amount IS NULL THEN 0 ELSE 0 END) AS cancel_amount
            FROM user_subscription_histories ush;
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
        if (!name || !api_call_count || !amount || !validity_number || !validity_time) {
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
                `SELECT s.*, p.*, 
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
                select u.*, p.* from user_subscription_histories u
                inner join plans p on u.plan_id = p.id
                where user_id = ? order by u.subscribe_date desc;
            `, [id])
            data.push({'invoices_and_billing_history': getAllInvoicesAndBillingHistory});
            return res.status(200).json({ success: true, message: "Data fetched successfully", data: data});
        }else if(path === 'billing-statements'){
            
        }else{
            return res.status(200).json({ success: true, message: "No path found"});
        }
    } catch (error) {
        console.error("Error updating plan:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}