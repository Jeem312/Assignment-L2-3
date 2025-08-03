import mongoose, { Schema } from 'mongoose';
import { TBookDocument, TBookModel } from './book.interface';

const bookSchema = new Schema<TBookDocument, TBookModel>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
  },
  isbn: {
    type: String,
    required: [true, 'ISBN is required'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  copies: {
    type: Number,
    required: [true, 'Copies is required'],
    min: [0, 'Copies must be a positive number'],
  },
  available: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Instance method
bookSchema.methods.updateAvailability = async function () {
  this.available = this.copies > 0;
  await this.save();
};

// Static method
bookSchema.statics.updateBookAvailability = async function (bookId: string) {
  const book = await this.findById(bookId);
  if (book) {
    book.available = book.copies > 0;
    await book.save();
  }
};

// Pre-save middleware
bookSchema.pre('save', function (next) {
  this.available = this.copies > 0;
  next();
});

// Post-save middleware
bookSchema.post('save', function () {
  console.log(`Book "${this.title}" saved with ${this.copies} copies available`);
});

export const Book = mongoose.model<TBookDocument, TBookModel>('Book', bookSchema);
