import express from "express";
import { updateProfile } from "../controllers/profile.controllers.js";

const profile_router = express.Router();

profile_router.patch('/update-profile', updateProfile);

export default profile_router;