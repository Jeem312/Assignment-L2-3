
import { Router } from "express";

import { BorrowController } from "./borrow.controller";



const router = Router();

// Borrow a book
router.post(
  '/',
  
  BorrowController.borrowBook
);

// Get borrowed books summary using aggregation
router.get(
  '/',
  BorrowController.getBorrowedBooksSummary
);




export const BorrowRoutes = router;

