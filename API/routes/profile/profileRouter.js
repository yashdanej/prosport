const express = require('express');
const router = express.Router();
const profileController = require('../../controller/profile/profileController');
const { verifyToken } = require('../../middleware/verifyToken');
const { upload } = require('../../middleware/upload');

router
    .patch("/update_profile", verifyToken, upload.single("file"), profileController.updateProfile)
    .get("/get_logged_user", verifyToken, profileController.getLoggedUser)

module.exports = router;