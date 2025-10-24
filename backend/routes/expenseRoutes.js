import express from "express";
import { getExpense, addExpense, deleteExpense } from "../controllers/expenseController.js";

const router = express.Router();

router.get("/", getExpense);
router.post("/", addExpense);
router.delete("/:id", deleteExpense);

export default router;
