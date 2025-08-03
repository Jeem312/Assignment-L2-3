/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../../helpers/AppError";
import { TBook, TBookQuery } from "./book.interface";
import { Book } from "./book.model";


const createBook = async (bookData: TBook) => {
  const result = await Book.create(bookData);
  return result;
};


const getAllBooks = async (query: TBookQuery) => {
  const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = query;
  
  // Build filter object
  const filterObj: any = {};
  if (filter) {
    filterObj.genre = filter;
  }
  
  // Build sort object
  const sortObj: any = {};
  sortObj[sortBy] = sort === 'desc' ? -1 : 1;
  
  const limitNum = parseInt(limit) || 10;
  
  const result = await Book.find(filterObj)
    .sort(sortObj)
    .limit(limitNum);
    
  return result;
};

const getBookById = async (bookId: string) => {
  const result = await Book.findById(bookId);
  
  if (!result) {
    throw new AppError(404, 'Book not found');
  }
  
  return result;
};

const updateBook = async (bookId: string, updateData: Partial<TBook>) => {
  const book = await Book.findById(bookId);
  
  if (!book) {
    throw new AppError(404, 'Book not found');
  }
  
  const result = await Book.findByIdAndUpdate(
    bookId,
    updateData,
    { new: true, runValidators: true }
  );
  
  return result;
};

const deleteBook = async (bookId: string) => {
  const book = await Book.findById(bookId);
  
  if (!book) {
    throw new AppError(404, 'Book not found');
  }
  
  await Book.findByIdAndDelete(bookId);
  return null;
};

export const BookService = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
};