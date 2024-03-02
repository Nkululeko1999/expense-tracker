import express from "express";
import { getProfileDetails, updateProfile } from "../controllers/profile.controllers.js";
import { authenticateToken } from "../middlewares/auth.middlewares.js";

const profile_router = express.Router();

profile_router.patch('/update-profile', authenticateToken, updateProfile);
profile_router.get('/profile-details/', authenticateToken, getProfileDetails);

export default profile_router;