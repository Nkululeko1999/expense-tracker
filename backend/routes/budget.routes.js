import express from "express";
import { createBudget, deleteBudget, getBudgets, updateBudget } from "../controllers/budget.controllers.js";
import { authenticateToken } from "../middlewares/auth.middlewares.js";

const budget_router = express.Router();

budget_router.post('/create-budget', authenticateToken, createBudget);
budget_router.get('/all-budgets', authenticateToken, getBudgets);
budget_router.patch('/update-budget/:id', authenticateToken, updateBudget);
budget_router.delete('/delete-budget/:id', authenticateToken, deleteBudget);

export default budget_router