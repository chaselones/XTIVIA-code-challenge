import React from 'react';
import { Container, Typography, Toolbar } from '@mui/material';

const Layout: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <div style={{width:"600px", margin: '15px auto', border: '2px solid gray', borderRadius:'10px', height: '90vh' }}>
        <Toolbar style={{ justifyContent: 'center'}}>
          <Typography variant="h4" style={{fontWeight: 'bold', margin: '20px'}}>BOOK MANAGER</Typography>
        </Toolbar>

      <Container style={{ marginTop: '20px', height: '80%'}}>
        {children}
      </Container>
    </div>
  );
};

export default Layout;