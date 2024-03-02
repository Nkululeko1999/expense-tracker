import bcryptjs from "bcryptjs";

export const verifyCodeMiddleware = async (req, res, next) => {
    const { code, user } = req.body;

    try {
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

        // If code is valid, proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Failed to verify code", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal Server Error"
        });
    }
};
