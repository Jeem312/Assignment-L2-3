"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowRoutes = void 0;
const express_1 = require("express");
const borrow_controller_1 = require("./borrow.controller");
const router = (0, express_1.Router)();
// Borrow a book - POST /api/borrow
router.post('/', borrow_controller_1.BorrowController.borrowBook);
// Get borrowed books summary using aggregation - GET /api/borrow
router.get('/', borrow_controller_1.BorrowController.getBorrowedBooksSummary);
exports.BorrowRoutes = router;
