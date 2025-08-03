import { Request, Response } from 'express';
import { BorrowService } from './borrow.service';
import httpStatus from 'http-status-codes';
import { catchAsync } from '../../../utils/catchAsync';

const borrowBook = catchAsync(async (req: Request, res: Response) => {
  const borrowData = {
    ...req.body,
    dueDate: new Date(req.body.dueDate),
  };

  const result = await BorrowService.borrowBook(borrowData);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Book borrowed successfully',
    data: result,
  });
});

const getBorrowedBooksSummary = catchAsync(async (req: Request, res: Response) => {
  const result = await BorrowService.getBorrowedBooksSummary();

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Borrowed books summary retrieved successfully',
    data: result,
  });
});

export const BorrowController = {
  borrowBook,
  getBorrowedBooksSummary,
};
