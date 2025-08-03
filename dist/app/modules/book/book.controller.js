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
exports.BookController = void 0;
const catchAsync_1 = require("../../../utils/catchAsync");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const book_service_1 = require("./book.service");
const createBook = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.BookService.createBook(req.body);
    res.status(http_status_codes_1.default.CREATED).json({
        success: true,
        message: 'Book created successfully',
        data: result
    });
}));
const getAllBooks = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.BookService.getAllBooks(req.query);
    res.status(http_status_codes_1.default.OK).json({
        success: true,
        message: 'Books retrieved successfully',
        data: result
    });
}));
const getBookById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const result = yield book_service_1.BookService.getBookById(bookId);
    res.status(http_status_codes_1.default.OK).json({
        success: true,
        message: 'Book retrieved successfully',
        data: result
    });
}));
const updateBook = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const result = yield book_service_1.BookService.updateBook(bookId, req.body);
    res.status(http_status_codes_1.default.OK).json({
        success: true,
        message: 'Book updated successfully',
        data: result
    });
}));
const deleteBook = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const result = yield book_service_1.BookService.deleteBook(bookId);
    res.status(http_status_codes_1.default.OK).json({
        success: true,
        message: 'Book deleted successfully',
        data: result
    });
}));
exports.BookController = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
};
