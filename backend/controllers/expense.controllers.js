import { errorHandler } from "../middlewares/error.middlewares.js"
import { Expense } from "../models/expense.models.js";


export const createExpense = async (req, res) => {
    //Get user details from the req.user
    const userDetails = req.user;
    const userId = userDetails.id;

    const { category, amount, description, date } = req.body;
    try {
        if(!category || !amount || !description || !date){
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Missing required Information"
            });
        }
        
        //Create new expense
        const newExpense = new Expense({userId, category, amount, description, date});

        //Save details to database
        await newExpense.save();

        return res.status(200).json({
            success: false,
            statusCode: 200,
            message: "Expense added successfully",
            data: newExpense
        });
    } catch (error) {
        errorHandler(req, res, error);
    }
}

export const getExpenses = async (req, res) => {
    try {
        //find all expenses
        const allExpenses = await Expense.find();

        return res.status(200).json({
            success: true,
            statusCode: 200,
            data: allExpenses
        });
    } catch (error) {
        errorHandler(req, res, error);
    }
}

export const updateExpense = async (req, res) => {
    const { category, amount, description, date } = req.body;
    const { id } = req.params;

    try {
        if (!category || !amount || !description || !date) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Missing required information"
            });
        }

        const newExpenseData = { category, amount, description, date };

        // Get expense by id and update it
        const updatedExpense = await Expense.findByIdAndUpdate(id, newExpenseData, { new: true });

        if (!updatedExpense) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Expense not found"
            });
        }

        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Expense updated successfully",
            data: updatedExpense
        });
    } catch (error) {
        errorHandler(req, res, error);
    }
}

export const deleteExpense = async (req, res) => {
    const { id } = req.params;

    try {
        // Find expense by id and delete it
        const deletedExpense = await Expense.findByIdAndDelete(id);

        if (!deletedExpense) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Expense not found"
            });
        }

        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Expense deleted successfully",
        });
    } catch (error) {
        errorHandler(req, res, error);
    }
}