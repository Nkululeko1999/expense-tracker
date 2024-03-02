import mongoose from "mongoose";


const budgetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    category: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    startDate: {
        type: Date,
        default: Date.now,
    },
    
    endDate: {
        type: Date,
        default: Date.now,
    },

},{timestamps: true});


export const Budget = mongoose.model('Budget', budgetSchema);