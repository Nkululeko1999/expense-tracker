import express from "express";
import { createExpense } from "../controllers/expense.controllers.js";

const expense_router = express.Router();

expense_router.post('/create-expense', createExpense);

export default expense_router