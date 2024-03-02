import jwt from "jsonwebtoken";
import "dotenv/config";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        //Unauthorized
        return res.status(401).json({
            sucess: false,
            statusCode: 401,
            message: "User not logged in. Please login."
        });
    }

    const jwtSecret = process.env.JWT_SECERT
    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            //Forbidden
            return res.status(403).json({
                sucess: false,
                statusCode: 403,
                message: "Session has expired."
            });n
        }
        req.user = user;
        next();
    });
}