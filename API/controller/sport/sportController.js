const axios = require('axios');
const CryptoJS = require('crypto-js');
const moment = require('moment-timezone');
const util = require('util');
const db = require('../../db');
const { verifyToken } = require('../../middleware/verifyToken');
const query = util.promisify(db.query).bind(db);


// -------------------- For live url
exports.Cricket = async (req, res, next) => {
    try {
        // Verify the token and get the user
        const getUser = await verifyToken(req, res, next, { verifyUser: true });
        
        // Pagination parameters from the request query
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const status = parseInt(req.query.status) || 0;

        // Fetch subscription token from the database
        const [getSubscriptionToken] = await query("SELECT token FROM user_subscriptions WHERE userId = ?", [getUser]);
        console.log("getSubscriptionToken", getSubscriptionToken);

        // Define the API URL
        const cricketApiUrl = `${process.env.BACKEND_LIVE_URL}/v1/matches`; // Replace with actual API URL

        // Fetch cricket data from the external API with pagination parameters and headers
        const response = await axios.get(cricketApiUrl, {
            params: {
                status: status?status:null,
                page: page,
                limit: limit
            },
            headers: {
                "token": `${getSubscriptionToken.token}` // Assuming token is passed as Bearer token
            }
        });

        console.log("response.data", response.data);
        if(response.data.status === 'unauthorized' || response.data.response === 'Your Plan is expired' || response.data.response === 'Your Plan is inactive'){
            return res.status(400).json({success: false, message: response.data.response});
        }
        // Extract data and pagination information from the API response
        const { matches, pageData } = response.data.response;
        

        // Send the response
        return res.status(200).json({
            status: true,
            data: matches, // Matches data from the API
            pagination: {
                currentPage: parseInt(pageData.currentPage),
                perPage: parseInt(pageData.perPage),
                totalItems: parseInt(pageData.total),
                totalPages: parseInt(pageData.lastPage)
            }
        });
    } catch (error) {
        console.error("Error fetching cricket data:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};


// ------------------------Temporary
// exports.Cricket = async (req, res, next) => {
//     try {
//         // Verify the token and get the user
//         await verifyToken(req, res, next, { verifyUser: true });

//         // Pagination parameters from the request query
//         const page = parseInt(req.query.page) || 1;
//         const limit = parseInt(req.query.limit) || 10;
//         const offset = (page - 1) * limit;

//         // Get the total number of records for pagination
//         const totalRecordsQuery = 'SELECT COUNT(*) AS total FROM matches';
//         const totalRecordsResult = await query(totalRecordsQuery);
//         const totalRecords = totalRecordsResult[0].total;

//         // Fetch paginated data from the database
//         const matchesQuery = 'SELECT * FROM matches LIMIT ? OFFSET ?';
//         const data = await query(matchesQuery, [limit, offset]);

//         // Send the response
//         return res.status(200).json({
//             status: true,
//             data: data,
//             pagination: {
//                 currentPage: page,
//                 perPage: limit,
//                 totalItems: totalRecords,
//                 totalPages: Math.ceil(totalRecords / limit)
//             }
//         });
//     } catch (error) {
//         console.error("Error fetching cricket data:", error);
//         return res.status(500).json({ status: false, message: "Internal Server Error" });
//     }
// };