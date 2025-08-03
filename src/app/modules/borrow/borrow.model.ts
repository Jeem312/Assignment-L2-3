import { Schema, model } from 'mongoose';
import {  TBorrowDocument } from './borrow.interfce';

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

// Pre-save middleware for logging
borrowSchema.pre('save', function(next) {
  console.log(`Borrowing ${this.quantity} copies of book ${this.book}`);
  next();
});

// Post-save middleware
borrowSchema.post('save', function() {
  console.log(`Borrow record created for ${this.quantity} copies due on ${this.dueDate}`);
});

export const Borrow = model<TBorrowDocument>('Borrow', borrowSchema);