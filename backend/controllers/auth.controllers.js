import { errorHandler } from "../middlewares/error.middlewares.js";
import { validateEmail, validatePass } from "../utils/validation.utils.js";
import bcryptjs from "bcryptjs";
import { User } from "../models/user.models.js";
import { generateCode } from "../utils/helper.utils.js";
import { transporter } from "../config/email.config.js";
import { verificationTemplate } from "../utils/template.utils.js";
import jwt from "jsonwebtoken";


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

        //Send email to user with verification token
        const info = await transporter.sendMail({
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
            message: 'User successfully created',
            data: rest,
            token: token
        });
    } catch (error) {
        errorHandler(req, res, error);
    }
}