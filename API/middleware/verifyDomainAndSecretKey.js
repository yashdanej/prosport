const util = require('util');
const db = require('../db');
const query = util.promisify(db.query).bind(db);

// Middleware to verify the domain using the secret key
exports.verifyDomainAndSecretKey = async (req, res, next) => {
    try {
        const originDomain = req.get('host');
        console.log("originDomain", originDomain);
        
        // Extract the domain and secret key from the request headers or query parameters
        // const companyDomain = req.headers['company-domain'] || req.query.company_domain;
        // const secretKey = req.headers['secret-key'] || req.query.secret_key;
        
        // If domain or secret key is not provided, return an error
        // if (!companyDomain || !secretKey) {
        //     return res.status(400).json({ success: false, message: 'Company domain and secret key are required' });
        // }

        // Query the database to check if the domain and secret key are valid
        const [user] = await query("SELECT * FROM users WHERE company_domain = ? AND status = 1", [originDomain]);

        // If the domain or secret key is invalid, return an error
        if (!user) {
            return res.status(403).json({ success: false, message: 'Unauthorized domain or invalid secret key' });
        }

        // Attach the user to the request object for further processing
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Error verifying domain and secret key:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};