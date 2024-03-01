import { errorHandler } from "../middlewares/error.middlewares.js";
import { validateEmail, validatePass } from "../utils/validation.utils.js";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //validate email => call validate util func
        if(!(validateEmail(email))){
            return res.status(422).json({success: false, status: 422, message: 'Email formati is invalid'});
        }

        //validate password => call validate util
        if(!(validatePass(password))){
            return res.status(422).json({success: false, status: 422, message: 'Password formati is invalid'});
        }

        //Check if username or email exist
        //If user exist but email does not => username already taken
        //if username and email exist then user already => login

        
    } catch (error) {
        next(error);
    }
}