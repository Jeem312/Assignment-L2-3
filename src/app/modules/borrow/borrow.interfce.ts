import { Types } from "mongoose";

export interface TBorrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

export interface Borrow {
    book: string;
    quantity: number;
    dueDate: Date;
}

export interface BorrowData {
  book: string;
  quantity: number;
  dueDate: Date;
}