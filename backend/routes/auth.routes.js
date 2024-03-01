import express from "express";
import 'dotenv/config';

const auth_router = express.Router();

auth_router.post('/register');

export default auth_router;