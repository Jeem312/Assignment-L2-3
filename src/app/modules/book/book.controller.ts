import { Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import httpStatus from "http-status-codes"
import { BookService } from "./book.service";


const createBook = catchAsync(async (req: Request, res: Response) => {

  const result = await BookService.createBook(req.body);
  
  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Book created successfully',
    data: result
  });
});
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getAllBooks(req.query);
  
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Books retrieved successfully',
    data: result
  });
});

const getBookById = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const result = await BookService.getBookById(bookId);
  
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Book retrieved successfully',
    data: result
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const result = await BookService.updateBook(bookId, req.body);
  
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Book updated successfully',
    data: result
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const result = await BookService.deleteBook(bookId);
  
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Book deleted successfully',
    data: result
  });
});

export const BookController = {
  createBook,
getAllBooks,
  getBookById,
  updateBook,
  deleteBook
};