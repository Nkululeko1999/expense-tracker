import express from "express";
import 'dotenv/config';
import { register, resendVerificationCode, verify } from "../controllers/auth.controllers.js";

const auth_router = express.Router();

auth_router.post('/register', register);
auth_router.post('/verify-user', verify);
auth_router.post('/resend-verifcation-code', resendVerificationCode);

export default auth_router;