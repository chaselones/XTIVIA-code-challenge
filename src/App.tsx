import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import store, { RootState } from './redux/store';
import theme from './theme';
import Layout from './components/Layout';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import BookEditForm from './components/BookEditForm';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Content />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
};

const Content: React.FC = () => {
  const editingBookId = useSelector((state: RootState) => state.books.editingBookId);

  return (
    <>
      {editingBookId ? <BookEditForm /> : <BookForm />}
      <BookList />
    </>
  );
};

export default App;