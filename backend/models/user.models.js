import mongoose from "mongoose";


//Create user Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },

    lastName: {
        type: String
    },

    phoneNumber: {
        type: String,
        unique: true
    },

    gender: {
        type: String,
    },

    address: {
        type: String
    },

    profilePic: {
        data: Buffer,  // Data field to store the image binary data
        contentType: String   // Content type of the image (e.g., 'image/jpeg', 'image/png')
    },

    username:{
        type: String,
        required: true,
        unique: true
    },
    
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
});

// Create Model for user
export const User = mongoose.model('User', userSchema);