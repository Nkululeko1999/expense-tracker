import express from "express";
import 'dotenv/config';
import { forgetPassword, register, resendVerificationCode, verify } from "../controllers/auth.controllers.js";

const auth_router = express.Router();

auth_router.post('/register', register);
auth_router.post('/verify-user', verify);
auth_router.post('/resend-verifcation-code', resendVerificationCode);
auth_router.post('/forgot-password', forgetPassword);

export default auth_router;