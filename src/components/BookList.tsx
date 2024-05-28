import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Book } from '../types';
import { List, ListItem, ListItemText, Button, Typography, SelectChangeEvent, Select, MenuItem, Box } from '@mui/material';
import { setEditingBookId } from '../redux/bookSlice';

const BookList: React.FC = () => {
  const books = useSelector((state: RootState) => state.books.books);
  const dispatch = useDispatch();

  const [sortOrder, setSortOrder] = useState('orderAddedAsc');

  const handleEditClick = (bookId: string) => {
    dispatch(setEditingBookId(bookId));
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortOrder(event.target.value as string);
  };

  const sortedBooks = [...books].sort((a, b) => {
    switch (sortOrder) {
      case 'orderAddedAsc':
        return a.id.localeCompare(b.id);
      case 'orderAddedDesc':
        return b.id.localeCompare(a.id);
      case 'titleAsc':
        return a.title.localeCompare(b.title);
      case 'titleDesc':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  return (
    <>
      <Box textAlign="right">
        <Typography variant="body1" component="span" color="textSecondary">
          Sort order:
        </Typography>
        <Select value={sortOrder} onChange={handleSortChange}>
          <MenuItem value="orderAddedAsc">Order Added Ascending</MenuItem>
          <MenuItem value="orderAddedDesc">Order Added Descending</MenuItem>
          <MenuItem value="titleAsc">Title Ascending</MenuItem>
          <MenuItem value="titleDesc">Title Descending</MenuItem>
        </Select>
      </Box>

      <List style={{ margin: 'auto', marginTop: '20px', overflow: 'auto', height:'75%' }}>
        {sortedBooks.map((book: Book) => (
          <div key={book.id}>
            <ListItem style={{ width: '100%' }}>
              <div style={{ display: 'flex', width: '100%' }}>
                <ListItemText
                  primary={
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>

                        <div>
                          <Typography variant="body1" component="span" style={{ fontWeight: 'bold' }}>
                            {book.title}
                          </Typography>

                          <Typography variant="body1" component="span">
                            {` (${book.publishedYear})`}
                          </Typography>
                        </div>

                        <Typography variant="body1" component="span" mr={4}>
                          {book.author}
                        </Typography>
                      </div>
                    </>
                  }

                  secondary={book.description.slice(0, 200) + '...'}
                />
              </div>

              <Button variant="contained" onClick={() => handleEditClick(book.id)}>
                Edit
              </Button>
            </ListItem>
            <hr style={{ width: '80%', margin: '10px auto' }} />
          </div>
        ))}
      </List>
    </>
  );
};

export default BookList;