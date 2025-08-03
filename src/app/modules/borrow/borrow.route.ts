import { Router } from "express";
import { BorrowController } from "./borrow.controller";

const router = Router();

// Borrow a book - POST /api/borrow
router.post(
  '/',
  BorrowController.borrowBook
);

// Get borrowed books summary using aggregation - GET /api/borrow
router.get(
  '/',
  BorrowController.getBorrowedBooksSummary
);

export const BorrowRoutes = router;