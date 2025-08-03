import mongoose from 'mongoose';
import { Borrow, TBorrowDocument} from './borrow.model';
import { Book } from '../book/book.model';
import AppError from '../../../helpers/AppError';
import { TBorrow } from './borrow.interfce';

const borrowBook = async (borrowData: TBorrow): Promise<TBorrowDocument> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const book = await Book.findById(borrowData.book).session(session);
    if (!book) throw new AppError(404, 'Book not found');

    if (book.copies < borrowData.quantity) {
      throw new AppError(400, `Only ${book.copies} copies available, but ${borrowData.quantity} requested`);
    }

    book.copies -= borrowData.quantity;
    await book.updateAvailability();
    await book.save({ session });

    const borrowRecord = await Borrow.create([borrowData], { session });

    await session.commitTransaction();
    return borrowRecord[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getBorrowedBooksSummary = async () => {
  const result = await Borrow.aggregate([
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
};

export const BorrowService = {
  borrowBook,
  getBorrowedBooksSummary
};
