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
exports.BookService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const AppError_1 = __importDefault(require("../../../helpers/AppError"));
const book_model_1 = require("./book.model");
const createBook = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.create(bookData);
    return result;
});
const getAllBooks = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = query;
    // Build filter object
    const filterObj = {};
    if (filter) {
        filterObj.genre = filter;
    }
    // Build sort object
    const sortObj = {};
    sortObj[sortBy] = sort === 'desc' ? -1 : 1;
    const limitNum = parseInt(limit) || 10;
    const result = yield book_model_1.Book.find(filterObj)
        .sort(sortObj)
        .limit(limitNum);
    return result;
});
const getBookById = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findById(bookId);
    if (!result) {
        throw new AppError_1.default(404, 'Book not found');
    }
    return result;
});
const updateBook = (bookId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(bookId);
    if (!book) {
        throw new AppError_1.default(404, 'Book not found');
    }
    const result = yield book_model_1.Book.findByIdAndUpdate(bookId, updateData, { new: true, runValidators: true });
    return result;
});
const deleteBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(bookId);
    if (!book) {
        throw new AppError_1.default(404, 'Book not found');
    }
    yield book_model_1.Book.findByIdAndDelete(bookId);
    return null;
});
exports.BookService = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
};
