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


export const BookController = {
  createBook,

};