const axios = require('axios');
const CryptoJS = require('crypto-js');
const moment = require('moment-timezone');
const util = require('util');
const db = require('../../db');
const { verifyToken } = require('../../middleware/verifyToken');
const query = util.promisify(db.query).bind(db);
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

// UpdateProfile
exports.updateProfile = async (req, res, next) => {
    try {
        const getUser = await verifyToken(req, res, next, { verifyUser: true });
        const [getSelectedUser] = await query("SELECT * FROM users WHERE id = ?", [getUser]);

        const { name, lastname, email, gender, dob, location, phone, language = "English", skills = "", from, company_name, company_domain, operator, address, city, postalcode, country, gst, aboutcompany } = req.body;
        // Ensure dob is properly formatted as a Date object
        // console.log("dob", dob);
        // const formattedDob = dob ? moment(dob).tz('Asia/Kolkata').toDate() : null;
        // console.log("formattedDob", formattedDob);
       
        // let imageFileName = getSelectedUser.image && getSelectedUser.image.substring(getSelectedUser.image.lastIndexOf('/') + 1);
        // console.log("imageFileName", imageFileName);
        // if (req.file) {
        //     // Handle image upload logic here
        //     const extension = path.extname(req.file.originalname);
        //     imageFileName = `${req.file.originalname}`;
        //     const uploadPath = path.join(__dirname, '../../public/uploads', module || 'default', imageFileName);

        //     if (fs.existsSync(req.file.path)) {
        //         fs.renameSync(req.file.path, uploadPath);
        //     }

        //     if (getSelectedUser.image) {
        //         const oldImagePath = path.join(__dirname, '../../public/uploads', module || 'default', getSelectedUser.image);
        //         if (fs.existsSync(oldImagePath)) {
        //             fs.unlinkSync(oldImagePath);
        //         }
        //     }
        // }
        // console.log("imageFileName2", imageFileName);

        // console.log("imageFileName", imageFileName);
        // const baseUrl = `${req.protocol}://${req.get('host')}`;
        // const userimage = `${baseUrl}/uploads/profile/${imageFileName}`;
        // console.log("userimage", userimage);
        // Perform the database update query
        if(from == "right"){
            if (!name || !email ) {
                return res.status(400).json({ success: false, message: 'Required fields are missing or invalid' });
            }
    
            // Check if the email is already in use by another user
            const existingUser = await query("SELECT id FROM users WHERE email = ? AND id != ?", [email, getSelectedUser.id]);
            if (existingUser.length > 0) {
                return res.status(400).json({ success: false, message: 'Email already in use' });
            }
            await query("UPDATE users SET name = ?, lastname = ?, email = ?, gender = ?, location = ?, phone = ?, language = ?, skills = ?, company_name = ?, company_domain = ?, operator = ?, address = ?, city = ?, postalcode = ?, country = ?, gst = ? WHERE id = ?",
                        [name, lastname, email, gender, location, phone, language, skills, company_name, company_domain, operator, address, city, postalcode, country, gst, getSelectedUser.id]);
        }else{
            await query("UPDATE users SET aboutcompany = ? WHERE id = ?",
                [aboutcompany, getSelectedUser.id]);
        }

        // Retrieve the updated user data
        const [updatedUser] = await query("SELECT * FROM users WHERE id = ?", [getUser]);
        return res.status(200).json({ success: true, message: 'Profile Updated Successfully', data: updatedUser });
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// UpdateProfile
exports.updateProfileImage = async (req, res, next) => {
    try {
        const { module, file } = req.body;
        console.log("file", file);
        console.log("req.file", req);
        
        const getUser = await verifyToken(req, res, next, { verifyUser: true });
        const [getSelectedUser] = await query("SELECT * FROM users WHERE id = ?", [getUser]);
        let imageFileName = getSelectedUser.image && getSelectedUser.image.substring(getSelectedUser.image.lastIndexOf('/') + 1);
        // Handle image upload logic here
        const extension = path.extname(req.file.originalname);
        imageFileName = `${req.file.originalname}`;
        const uploadPath = path.join(__dirname, '../../public/uploads', module || 'default', imageFileName);

        if (fs.existsSync(req.file.path)) {
            fs.renameSync(req.file.path, uploadPath);
        }

        if (getSelectedUser.image) {
            const oldImagePath = path.join(__dirname, '../../public/uploads', module || 'default', getSelectedUser.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const userimage = `${baseUrl}/uploads/profile/${imageFileName}`;
        console.log("userimage", userimage);
        // Perform the database update query
        await query("UPDATE users SET image = ? WHERE id = ?",
                    [userimage, getSelectedUser.id]);

        // Retrieve the updated user data
        const [updatedUser] = await query("SELECT image FROM users WHERE id = ?", [getUser]);
        return res.status(200).json({ success: true, message: 'Image Updated Successfully', data: updatedUser });
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// GetLoggedUser
exports.getLoggedUser = async (req, res, next) => {
    try {
        // Verify the token and get the user
        const getUser = await verifyToken(req, res, next, { verifyUser: true });
        
        // Get the user's details
        const users = await query("SELECT * FROM users WHERE id = ?", [getUser]);
        
        // Check if user exists
        if (users.length === 0) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Get the user
        const user = users[0];

        // Construct the full image URL if an image exists
        // if (user.image) {
        //     const baseUrl = `${req.protocol}://${req.get('host')}`;
        //     // Adjust the path based on your server structure
        //     user.image = `${baseUrl}/uploads/profile/${user.image}`;
        // }

        // Send the response
        return res.status(200).json({
            status: true,
            data: user
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// ChangePassword
exports.ChangePassword = async (req, res, next) => {
    try {
        // Verify the token and get the user
        const getUser = await verifyToken(req, res, next, { verifyUser: true });
        
        // Get the user's details
        const users = await query("SELECT * FROM users WHERE id = ?", [getUser]);
        
        // Check if user exists
        if (users.length === 0) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Get the user
        const user = users[0];

        // Get the current and new passwords from request body
        const { currentPassword, newPassword } = req.body;
        
        // Check if the current password is correct
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        console.log("isMatch", isMatch);
        
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Current password is incorrect" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the password in the database
        await query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, user.id]);

        // Send the response
        return res.status(200).json({
            success: true,
            message: "Password updated successfully"
        });
    } catch (error) {
        console.error("Error changing password:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};