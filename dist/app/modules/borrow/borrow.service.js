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
exports.BorrowService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const borrow_model_1 = require("./borrow.model");
const book_model_1 = require("../book/book.model");
const AppError_1 = __importDefault(require("../../../helpers/AppError"));
const borrowBook = (borrowData) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const book = yield book_model_1.Book.findById(borrowData.book).session(session);
        if (!book)
            throw new AppError_1.default(404, 'Book not found');
        if (book.copies < borrowData.quantity) {
            throw new AppError_1.default(400, `Only ${book.copies} copies available, but ${borrowData.quantity} requested`);
        }
        book.copies -= borrowData.quantity;
        yield book.updateAvailability();
        yield book.save({ session });
        const borrowRecord = yield borrow_model_1.Borrow.create([borrowData], { session });
        yield session.commitTransaction();
        return borrowRecord[0];
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
const getBorrowedBooksSummary = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield borrow_model_1.Borrow.aggregate([
        {
            $group: {
                _id: '$book',
                totalQuantity: { $sum: '$quantity' }
            }
        },
        {
            $lookup: {
                from: 'books',
                localField: '_id',
                foreignField: '_id',
                as: 'bookDetails'
            }
        },
        { $unwind: '$bookDetails' },
        {
            $project: {
                _id: 0,
                book: {
                    title: '$bookDetails.title',
                    isbn: '$bookDetails.isbn'
                },
                totalQuantity: 1
            }
        },
        { $sort: { totalQuantity: -1 } }
    ]);
    return result;
});
exports.BorrowService = {
    borrowBook,
    getBorrowedBooksSummary
};
