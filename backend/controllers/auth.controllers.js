import { errorHandler } from "../middlewares/error.middlewares.js";
import { validateEmail, validatePass } from "../utils/validation.utils.js";
import bcryptjs from "bcryptjs";
import { User } from "../models/user.models.js";
import { generateCode } from "../utils/helper.utils.js";
import { transporter } from "../config/email.config.js";
import { forgotPasswordTemplate, signUpSuccessTemplate, verificationTemplate } from "../utils/template.utils.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";



// #######################################################################
//AUTHENTICATION CONTROLLERS
// #######################################################################

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //validate email => call validate util func
        if(!(validateEmail(email))){
            return res.status(422).json({success: false, status: 422, message: 'Email format is invalid'});
        }

        //validate password => call validate util
        if(!(validatePass(password))){
            return res.status(422).json({success: false, status: 422, message: 'Password format is invalid'});
        }

        //hash password
        const hashedPassword = bcryptjs.hashSync(password, 12);

        //Check if username or email exist
        //If user exist but email does not => username already taken
        //if username and email exist then user already => login
        const emailExist = await User.findOne({email: email});
        const usernameExist = await User.findOne({username: username});

        if(emailExist){
            return res.status(409).json({success: false, status: 409, message: 'User already exists. Please login'});
        }

        if(usernameExist){
            return res.status(409).json({success: false, status: 409, message: 'Username already taken.'});
        }   

        //generate code and set expiration time of the code
        const code = generateCode();
        const hashedCode = bcryptjs.hashSync(code, 12);
        let codeExp = new Date();
        codeExp.setMinutes(codeExp.getMinutes() + 10);    //code expiry after 10 minutes

        //Create a new user using the User model
        const newUser = new User({ username, email, password: hashedPassword, code: hashedCode, codeExp: codeExp });

        //save user
        await newUser.save();

        //Extract only useful information
        const rest = {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            verified: newUser.userVerified
        };

        //Send email to user with verification code
        await transporter.sendMail({
            from: process.env.NODEMAILER_USER, 
            to: email, 
            subject: "One-time verification code", 
            html: verificationTemplate(code), 
          });


        //create jwt token
        const secret = process.env.JWT_SECERT;
        const token = jwt.sign(rest, secret, {expiresIn:'10m'});

        return res.status(200).json({
            success: true,
            status: 200,
            message: 'User successfully created. Please verify your account.',
            data: rest,
            token: token
        });
    } catch (error) {
        errorHandler(req, res, error);
    }
}

export const verify = async (req, res) => {
    try {
        const { userId, code } = req.body;

        //get user by Id
        const user = await User.findById({_id: userId});
        if(!user){
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "User not found. Please contact us."
            });
        }

         //check if code does exist
         if(user.code === null || user.codeExp === null){
            return res.status(404).json({
                sucess: false,
                statusCode: 404,
                message: "Please resend code. Verification code not found"
            })
        }


        //check if code provided is the same as the saved code - remember saved code is hashed
        const isCodeMatching = bcryptjs.compareSync(code, user.code);
        if(!isCodeMatching){
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Invalid verification code. Please resend code."
            });
        }

        //check the expiration time for the code
        if(user.codeExp < new Date()){
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Verification code expired. Please resend code."
            });
        }

        //Update User's verified status
        user.userVerified = true;

        //set code and codeExp to null
        user.code = null;
        user.codeExp = null;
        
        //save user with updated status
        await user.save();

        //Extract only useful information
        const rest = {
            id: user._id,
            username: user.username,
            email: user.email,
            verified: user.userVerified
        };

        //Send email to user => successfully registered to expense tracker
        //Send email to user with verification code
        await transporter.sendMail({
            from: process.env.NODEMAILER_USER, 
            to: user.email, 
            subject: "Successfully Signed Up", 
            html: signUpSuccessTemplate(), 
          });

        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User account verified successfully.",
            data: rest
        });
    } catch (error) {
        errorHandler(req, res, error);
    }
}

export const resendVerificationCode = async (req, res) => {
    const { email } = req.body;
    try {
        //get user by email
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "User not found. Please create account."
            });
        }

        //generate code, codeExp and hash the code
        const code = generateCode();
        const hashedCode = bcryptjs.hashSync(code, 12);
        let codeExp = new Date();
        codeExp.setMinutes(codeExp.getMinutes() + 10);   

        //Update user's code and code exp
        user.code = hashedCode;
        user.codeExp = codeExp;

        //save user
        await user.save();

        //Extract only useful information
        const rest = {
            id: user._id,
            username: user.username,
            email: user.email,
            verified: user.userVerified
        };

        //Send email to user with verification token
        await transporter.sendMail({
            from: process.env.NODEMAILER_USER, 
            to: email, 
            subject: "One-time verification code", 
            html: verificationTemplate(code), 
          });

          //create jwt token
        const secret = process.env.JWT_SECERT;
        const token = jwt.sign(rest, secret, {expiresIn:'10m'});

        return res.status(200).json({
            success: true,
            status: 200,
            message: "Verification code resent successfully.",
            token: token
        });

    } catch (error) {
        errorHandler(req, res, error);
    }
}

export const forgetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        //check if email is valid
        const isEmailValid = validateEmail(email);
        if(!isEmailValid){
            return res.status(422).json({
                success: false,
                statusCode: 422,
                message: "Email format is invalid"
            });
        }

        //Get user by email
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(422).json({
                success: false,
                statusCode: 404,
                message: "User with this email is not found. Please login"
            });
        }

        //Generate code
        const code = generateCode();
        const hashedCode = bcryptjs.hashSync(code, 12);
        let codeExp = new Date();
        codeExp = codeExp.setMinutes(codeExp.getMinutes() + 10);

        //Update code and codeExp 
        user.code = hashedCode;
        user.codeExp = codeExp;

        await user.save();

         //Extract only useful information
         const rest = {
             id: user._id,
             username: user.username,
             email: user.email,
             verified: user.userVerified
         };
 

         //Send email to user with verification code
         await transporter.sendMail({
            from: process.env.NODEMAILER_USER, 
            to: email, 
            subject: "One-time verification code - Forgot Password", 
            html: forgotPasswordTemplate(code), 
          });


        //create jwt token
        const secret = process.env.JWT_SECERT;
        const token = jwt.sign(rest, secret, {expiresIn:'10m'});

        return res.status(200).json({
            success: true,
            status: 200,
            message: 'Verication code sent to your email. Confirm the code',
            data: rest,
            token: token
        });

    } catch (error) {
        errorHandler(req, res, error);
    }
}

export const resetPassword = async (req, res, next) => {
    const { newPassword, userId, code } = req.body;
    try {
        //validate password => call validate util
        if(!(validatePass(newPassword))){
            return res.status(422).json({success: false, status: 422, message: 'Password format is invalid'});
        }

        //Get user by userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID' });
        }
        
        const user = await User.findById(userId);
        
        if(!user){
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "User not found. Please create account."
            });
        }

        //check if code does exist
        if(user.code === null || user.codeExp === null){
            return res.status(404).json({
                sucess: false,
                statusCode: 404,
                message: "Please forgot password again. Verification code not found"
            })
        }

        // Check if code provided is the same as the saved code - remember saved code is hashed
        const isCodeMatching = bcryptjs.compareSync(code, user.code);
        if (!isCodeMatching) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Invalid verification code. Please resend code."
            });
        }

        // Check the expiration time for the code
        if (user.codeExp < new Date()) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Verification code expired. Please resend code."
            });
        }



        //Hash new password
        const newPasswordHashed = bcryptjs.hashSync(newPassword, 12);

        //Update password
        user.password = newPasswordHashed;

        //Reset code and codeExp
        user.code = null;
        user.codeExp = null;

        //Save user
        await user.save();

        return res.status(200).json({
            sucess: true,
            statusCode: 200,
            message: "Password reset sucessfully."
        });
        
    } catch (error) {
        errorHandler(req, res, error);
    }
}

export const login = async (req, res) => {
    const { email, password, username } = req.body;
    try {
        //validate email => call validate util func
        if(!(validateEmail(email))){
            return res.status(422).json({success: false, status: 422, message: 'Email format is invalid'});
        }

        //validate password => call validate util
        if(!(validatePass(password))){
            return res.status(422).json({success: false, status: 422, message: 'Password format is invalid'});
        }

        //get user by email or username
        const user = await User.findOne({ email: email });

        if(!user){
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "User not found. Please create account."
            });
        }

        //Check if acccount is verified
        if(user.userVerified === false){
            return res.status(422).json({
                success: false,
                statusCode: 422,
                message: "Account not verified. Please verify account."
            });
        }

        //Compare password with stored one
        const isPasswordMatching = bcryptjs.compareSync(password, user.password);

        //if password not matching
        if(!isPasswordMatching){
            return res.status(422).json({
                success: false,
                statusCode: 400,
                message: "Invalid login credentials"
            });
        }

        //Extract useful Info
        const rest = {
            id: user._id,
            username: user.username,
            email: user.email,
            verified: user.userVerified,
            profilePic: user.profilePic
        };

        //Assign user token
        const secret = process.env.JWT_SECERT;
        const token = jwt.sign(rest, secret, {expiresIn:'1h'});

        //Signin user
        return res.status(200).json({
            success: true,
            status: 200,
            message: 'Login Successfully',
            data: rest,
            token: token
        });
    } catch (error) {
        errorHandler(req, res, error);
    }
}