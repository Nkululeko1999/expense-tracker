import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import { User } from '../models/user.models.js';
import { profileUpdatedTemplate } from '../utils/template.utils.js';
import { errorHandler } from '../middlewares/error.middlewares.js';
import { validateEmail, validatePass } from '../utils/validation.utils.js';
import { transporter } from '../config/email.config.js';

export const updateProfile = async (req, res) => {
    //Get user details from req.user
    const userDetails = req.user;
    const userId = userDetails.id;
    
    try {
        const { firstName, lastName, email, profilePic, gender, address, phoneNumber } = req.body;

        // Check if any required field is missing
        if (!firstName || !lastName || !email || !gender || !address || !userId) {
            return res.status(400).json({ success: false, status: 400, message: 'Required fields are missing' });
        }

        // Validate email and password formats
        if (!validateEmail(email)) {
            return res.status(422).json({ success: false, status: 422, message: 'Email format is invalid' });
        }

        // Check if userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID' });
        }

        // Find user by userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, statusCode: 404, message: 'User not found. Please create an account.' });
        }

        // Update user profile fields
        Object.assign(user, {
            firstName,
            lastName,
            phoneNumber,
            email,
            profilePic,
            gender,
            address
        });

        // Check if file is uploaded
        if (req.file) {
            // Get file details
            const { filename, contentType } = req.file;
            // Set profilePic data and contentType
            user.profilePic = {
                data: filename, // Store the file name
                contentType: contentType
            };
        }

        // Save updated user
        await user.save();

         //Send email to user with verification code
         await transporter.sendMail({
            from: process.env.NODEMAILER_USER, 
            to: email, 
            subject: "Profile updated", 
            html: profileUpdatedTemplate(), 
          });

        return res.status(200).json({ success: true, statusCode: 200, message: 'Profile updated successfully' });
    } catch (error) {
        errorHandler(req, res, error);
    }
};

export const getProfileDetails = async (req, res) => {
    try {
        //Get user details from req.user
        const userDetails = req.user;
        const userId = userDetails.id;

        // Find the user in the database
        const user = await User.findById(userId);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ success: false, statusCode: 404, message: 'User not found' });
        }

        // Remove password field from the user object
        const { password, ...rest } = user;

        // Return user's profile details
        return res.status(200).json({ success: true, statusCode: 200, data: rest._doc });
    } catch (error) {
        errorHandler(req, res, error);
    }
};
