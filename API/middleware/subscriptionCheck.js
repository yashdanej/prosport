const util = require('util');
const db = require('../db');
const query = util.promisify(db.query).bind(db);
const { verifyToken } = require("./verifyToken");

const subscriptionCheck = async (req, res, next) => {
    try {
        // Get the user from the token verification
        const getUser = await verifyToken(req, res, next, { verifyUser: true });

        // Fetch the active subscription of the user
        const [subscription] = await query(
            "SELECT * FROM user_subscriptions WHERE userId = ?",
            [getUser, 1]
        );

        // Check if the user has a subscription
        if (!subscription) {
            return res.status(403).json({
                status: false,
                message: "Subscription not found or inactive.",
            });
        }

        // Check if the subscription has expired
        const currentDate = new Date();
        const expireDate = new Date(subscription.expire_date);
        if (expireDate < currentDate) {
            // Update subscription status to inactive if expired
            await query(
                "UPDATE user_subscriptions SET status = ? WHERE id = ?",
                [0, subscription.id]
            );
            // return res.status(403).json({
            //     status: false,
            //     message: "Subscription has expired.",
            // });
        }
        const [plan] = await query("select * from plans where id = ?", [subscription.planId]);
        console.log("planplan", plan);
        
        // Check if the API call limit is reached
        if (subscription.api_hits >= +plan.api_call.split(" ")[0]) {
            console.log("subscription.api_hits");
            // Update subscription status to inactive if API hits are exhausted
            await query(
                "UPDATE user_subscriptions SET status = ? WHERE id = ?",
                [0, subscription.id]
            );
            // return res.status(403).json({
            //     status: false,
            //     message: "API call limit reached. Subscription is inactive.",
            // });
        }

        console.log("req.subscription");
        // If everything is fine, proceed to the next middleware or route handler
        req.subscription = subscription; // Pass the subscription data to the next handler
        next();
    } catch (error) {
        console.error("Error checking subscription:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

module.exports = subscriptionCheck;