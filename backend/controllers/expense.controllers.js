import { errorHandler } from "../middlewares/error.middlewares.js"
import { Expense } from "../models/expense.models.js";


export const createExpense = async (req, res) => {
    const { userId } = req.user;
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
        const newExpense = new Expense({category, amount, description, date});

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