import mongoose from "mongoose";


//Create user Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        default: null,
    },

    lastName: {
        type: String,
        default: null,
    },

    phoneNumber: {
        type: String,
        default: null,
    },

    gender: {
        type: String,
        default: null,
    },

    address: {
        type: String,
        default: null,
    },

    profilePic: {
        data: Buffer,  // Data field to store the image binary data
        contentType: String,   // Content type of the image (e.g., 'image/jpeg', 'image/png')
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

    code: {
        type: String,
        default: null,
    },

    codeExp: {
        type: Date,
        default: null
    },

    userVerified: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true});

// Create Model for user
export const User = mongoose.model('User', userSchema);