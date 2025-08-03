import mongoose, { Schema, Document, Model } from 'mongoose';
import { TBorrow } from './borrow.interfce';


export interface TBorrowDocument extends TBorrow, Document {}

const borrowSchema = new Schema<TBorrowDocument>({
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: [true, 'Book ID is required']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1']
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required']
  }
}, {
  timestamps: true
});

// Pre-save middleware (optional logging)
borrowSchema.pre<TBorrowDocument>('save', function(next) {
  console.log(`Borrowing ${this.quantity} copies of book ${this.book}`);
  next();
});

// Post-save middleware (optional logging)
borrowSchema.post<TBorrowDocument>('save', function(doc) {
  console.log(`Borrow record created for ${doc.quantity} copies due on ${doc.dueDate}`);
});

export const Borrow: Model<TBorrowDocument> = mongoose.model<TBorrowDocument>('Borrow', borrowSchema);
