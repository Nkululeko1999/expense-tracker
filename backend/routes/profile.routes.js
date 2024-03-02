import express from "express";
import { getProfileDetails, updateProfile } from "../controllers/profile.controllers.js";

const profile_router = express.Router();

profile_router.patch('/update-profile', updateProfile);
profile_router.get('/profile-details/:userId', getProfileDetails);

export default profile_router;