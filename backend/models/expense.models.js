import mongoose from "mongoose";


const expenseSchema = new mongoose.Schema({
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

    description: {
        type: String,
        required: true,
    }

},{timestamps: true});


const Expense = mongoose.Model('Expense', expenseSchema);