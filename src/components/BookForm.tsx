import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBook } from '../redux/bookSlice';
import { RootState } from '../redux/store';
import { Book } from '../types';
import { TextField, Button, Grid, Typography } from '@mui/material';
import axios from 'axios';

const BookForm: React.FC = () => {
  const [openLibraryId, setOpenLibraryId] = useState('');
  const [error, setError] = useState('');
  const books = useSelector((state: RootState) => state.books.books);
  const dispatch = useDispatch();

  const removeHtmlTags = (str: string) => {
    if ((str === null) || (str === ''))
      return str;
    else
      str = str.toString();
    return str.replace(/<[^>]*>/g, '');
  }

  const handleAddBook = async () => {
    try {
      let url;
      if (openLibraryId.toLowerCase().endsWith('w')) {
        url = `https://openlibrary.org/works/${openLibraryId}.json`;
        console.log(url)
      } else if (openLibraryId.toLowerCase().endsWith('m')) {
        url = `https://openlibrary.org/books/${openLibraryId}.json`;
        console.log(url)
      } else {
        setError('Invalid ID');
        setTimeout(() => {
          setError('');
          setOpenLibraryId('');
        }, 3000);
        return;
      }

      const response = await axios.get(url);
      const data = response.data;

      let authorKey = null;

      if (data.authors) {
        if (typeof data.authors[0] === 'object') {
          if ('key' in data.authors[0]) {
            authorKey = data.authors[0].key;
          } else if ('author' in data.authors[0] && 'key' in data.authors[0].author) {
            authorKey = data.authors[0].author.key;
          }
        }
      }

      if (authorKey) {
        const authorResponse = await axios.get(`https://openlibrary.org${authorKey}.json`);
        const authorData = authorResponse.data;
        data.authors[0] = authorData;
        console.log(data.authors[0].name);
      } else {
        data.authors = 'Author data not available';
      }

      const newBook: Book = {
        id: data.key,
        title: data.title,
        author: data.authors ? data.authors[0].name : 'Unknown Author',
        publishedYear: data.created ? new Date(data.created.value).getFullYear() : 'Unknown Year',
        description: data.description ? (typeof data.description === 'string' ? removeHtmlTags(data.description) : removeHtmlTags(data.description.value)) : 'No description available',
        timeAdded: Date.now(),
      };

      // Check if the book already exists in the list
      if (books.find(book => book.id === newBook.id)) {
        setError('This book is already in the list.');
        setTimeout(() => {
          setError('');
          setOpenLibraryId('');
        }, 3000);
        return;
      }

      dispatch(addBook(newBook));
      setOpenLibraryId('');
      setError(''); // Clear the error message
    } catch (error) {
      console.error('Error fetching book details:', error);
      setError('Failed to fetch book details. Please check the Open Library ID and try again.');
      setTimeout(() => {
        setError('');
        setOpenLibraryId('');
      }, 3000);
    }
  };

  return (
    <Grid container spacing={2} style={{marginBottom: '30px'}}>
      <Grid item xs={9}>
        <TextField
          label="Open Library ID"
          value={openLibraryId}
          onChange={(e) => setOpenLibraryId(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={1}>
        <Button variant="contained" onClick={handleAddBook} fullWidth>
          Add
        </Button>
      </Grid>
      {error && (
        <Grid item xs={12}>
          <Typography color="error">{error}</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default BookForm;