import { Budget } from "../models/budget.models.js";

export const createBudget = async (req, res) => {
    // Get user details from req.user
    const userDetails = req.user;
    const userId = userDetails.id;

    const { category, amount, description, startDate, endDate } = req.body;
    try {
        if (!category || !amount || !description || !startDate || !endDate) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Missing required information"
            });
        }
        
        // Create new budget
        const newBudget = new Budget({ userId, category, amount, description, startDate, endDate });

        // Save details to database
        await newBudget.save();

        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Budget added successfully",
            data: newBudget
        });
    } catch (error) {
        errorHandler(req, res, error);
    }
}

export const getBudgets = async (req, res) => {
    try {
        // Find all budgets
        const allBudgets = await Budget.find();

        return res.status(200).json({
            success: true,
            statusCode: 200,
            data: allBudgets
        });
    } catch (error) {
        errorHandler(req, res, error);
    }
}

export const updateBudget = async (req, res) => {
    const { category, amount, description, startDate, endDate } = req.body;
    const { id } = req.params;

    try {
        if (!category || !amount || !description || !startDate || !endDate) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Missing required information"
            });
        }

        const newBudgetData = { category, amount, description, startDate, endDate };

        // Get budget by id and update it
        const updatedBudget = await Budget.findByIdAndUpdate(id, newBudgetData, { new: true });

        if (!updatedBudget) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Budget not found"
            });
        }

        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Budget updated successfully",
            data: updatedBudget
        });
    } catch (error) {
        errorHandler(req, res, error);
    }
}

export const deleteBudget = async (req, res) => {
    const { id } = req.params;

    try {
        // Find budget by id and delete it
        const deletedBudget = await Budget.findByIdAndDelete(id);

        if (!deletedBudget) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Budget not found"
            });
        }

        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Budget deleted successfully",
        });
    } catch (error) {
        errorHandler(req, res, error);
    }
}
