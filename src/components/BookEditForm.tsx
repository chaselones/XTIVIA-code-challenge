import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBook, setEditingBookId } from '../redux/bookSlice';
import { Book } from '../types';
import { RootState } from '../redux/store';
import { TextField, Button, Grid, Box, Typography } from '@mui/material';

const BookEditForm: React.FC = () => {
  const dispatch = useDispatch();
  const editingBookId = useSelector((state: RootState) => state.books.editingBookId);
  const book = useSelector((state: RootState) =>
    state.books.books.find((b) => b.id === editingBookId)
  );

  const [title, setTitle] = useState(book?.title || '');
  const [author, setAuthor] = useState(book?.author || '');
  const [publishedYear, setPublishedYear] = useState(book?.publishedYear || '');
  const [description, setDescription] = useState(book?.description || '');

  const handleUpdateBook = () => {
    if (book) {
      const updatedBook: Book = {
        ...book,
        title,
        author,
        publishedYear: Number(publishedYear),
        description,
      };
      dispatch(updateBook(updatedBook));
      dispatch(setEditingBookId(null));
    }
  };

  const handleCancel = () => {
    dispatch(setEditingBookId(null)); 
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      {book ? (
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={2}>
            <label>ID</label>
          </Grid>
          <Grid item xs={10}>
            <Typography>{book.id}</Typography>
          </Grid>
          <Grid item xs={2}>
            <label>Title</label>
          </Grid>
          
          <Grid item xs={10}>
            <TextField
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <label>Author</label>
          </Grid>
          <Grid item xs={10}>
            <TextField
              fullWidth
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <label>Published Year</label>
          </Grid>
          <Grid item xs={10}>
            <TextField
              fullWidth
              value={publishedYear}
              onChange={(e) => setPublishedYear(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <label>Description</label>
          </Grid>
          <Grid item xs={10}>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button variant="contained" onClick={handleUpdateBook} style={{ marginRight: '10px' }}>
                Save
              </Button>
              <Button variant="contained" onClick={handleCancel}>
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
  ) : (
    <p>No book selected for editing</p>
  )
}
    </div >
  );
};

export default BookEditForm;