import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../types';

interface BooksState {
  books: Book[];
  editingBookId: string | null;
}

const initialState: BooksState = {
  books: [],
  editingBookId: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook(state, action: PayloadAction<Book>) {
      state.books.push(action.payload);
    },
    updateBook(state, action: PayloadAction<Book>) {
      const index = state.books.findIndex(book => book.id === action.payload.id);
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
    setBooks(state, action: PayloadAction<Book[]>) {
      state.books = action.payload;
    },
    setEditingBookId(state, action: PayloadAction<string | null>) {
      state.editingBookId = action.payload;
    },
    // deleteBook(state, action: PayloadAction<string>) {
    //   state.books = state.books.filter(book => book.id !== action.payload);
    // }
  },
});

export const { addBook, updateBook, setBooks, setEditingBookId } = booksSlice.actions;
export default booksSlice.reducer;