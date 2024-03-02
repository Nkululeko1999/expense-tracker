import express from "express";
import { createExpense, deleteExpense, getExpenses, updateExpense } from "../controllers/expense.controllers.js";
import { authenticateToken } from "../middlewares/auth.middlewares.js";

const expense_router = express.Router();

expense_router.post('/create-expense', authenticateToken, createExpense);
expense_router.get('/all-expenses', authenticateToken, getExpenses);
expense_router.patch('/update-expense/:id', authenticateToken, updateExpense);
expense_router.delete('/delete-expense/:id', authenticateToken, deleteExpense);

export default expense_router;