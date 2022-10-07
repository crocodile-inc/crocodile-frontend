import { Container, Paper, Typography } from '@mui/material';

export const Footer = () => {
  return (
    <Paper component="footer" sx={{ p: 2 }} variant="outlined" square>
      <Container maxWidth="lg">
        <Typography sx={{ textAlign: 'center' }}>
          All rights reserved © <span className="gradient-text">Crocodile</span>
        </Typography>
      </Container>
    </Paper>
  );
};
