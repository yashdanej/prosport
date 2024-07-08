const express = require('express');
const router = express.Router();
const authController = require('../../controller/auth/authController');
// const { verifyToken } = require('../../middleware/verifyToken');

router
    .post("/signup", authController.Signup)
    .post("/login", authController.Login)
    .get("/refferal", authController.Refferal)
    .get("/all_users", authController.AllUsers)
    // .patch("/updaterole/:id", verifyToken, authController.UpdateRole) // activity

module.exports = router;