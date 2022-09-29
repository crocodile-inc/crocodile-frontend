import { Container, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { routes } from '~/routes';

export const Header = () => {
  return (
    <Paper
      sx={{ position: 'sticky', top: 0, zIndex: 1000, p: 1 }}
      component="header"
      variant="outlined"
      square
    >
      <Container maxWidth="lg">
        <Link to={routes.home}>
          <Typography>Crocodile</Typography>
        </Link>
      </Container>
    </Paper>
  );
};
