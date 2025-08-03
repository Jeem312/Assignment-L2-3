import { Document, Types } from 'mongoose';

export interface TBorrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

export interface TBorrowDocument extends TBorrow, Document {}

export interface TBorrowSummary {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}