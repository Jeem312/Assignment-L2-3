import { Document, Model } from 'mongoose';

export interface TBook {
  title: string;
  author: string;
  genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}
export interface TBookQuery {
  filter?: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';
  sortBy?: string;
  sort?: 'asc' | 'desc';
  limit?: string;
}


export interface TBookDocument extends TBook, Document {
  updateAvailability(): Promise<void>;
}

export interface TBookModel extends Model<TBookDocument> {
  updateBookAvailability(bookId: string): Promise<void>;
}
