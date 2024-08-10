const express = require('express');
const router = express.Router();
const profileController = require('../../controller/profile/profileController');
const { verifyToken } = require('../../middleware/verifyToken');
const { upload } = require('../../middleware/upload');

router
    .patch("/update_profile", verifyToken, profileController.updateProfile)
    .patch("/update_profile/image", verifyToken, upload.single("file"), profileController.updateProfileImage)
    .get("/get_logged_user", verifyToken, profileController.getLoggedUser)
    .patch("/change-password", verifyToken, profileController.ChangePassword)

module.exports = router;