"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowController = void 0;
const borrow_service_1 = require("./borrow.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const catchAsync_1 = require("../../../utils/catchAsync");
const borrowBook = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const borrowData = Object.assign(Object.assign({}, req.body), { dueDate: new Date(req.body.dueDate) });
    const result = yield borrow_service_1.BorrowService.borrowBook(borrowData);
    res.status(http_status_codes_1.default.CREATED).json({
        success: true,
        message: 'Book borrowed successfully',
        data: result,
    });
}));
const getBorrowedBooksSummary = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield borrow_service_1.BorrowService.getBorrowedBooksSummary();
    res.status(http_status_codes_1.default.OK).json({
        success: true,
        message: 'Borrowed books summary retrieved successfully',
        data: result,
    });
}));
exports.BorrowController = {
    borrowBook,
    getBorrowedBooksSummary,
};
