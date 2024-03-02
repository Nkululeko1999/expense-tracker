import express from "express";
import 'dotenv/config';
import { register } from "../controllers/auth.controllers.js";

const auth_router = express.Router();

auth_router.post('/register', register);

export default auth_router;