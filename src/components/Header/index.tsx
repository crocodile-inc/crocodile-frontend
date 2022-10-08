import { Box, Container, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { routes } from '~/routes';
import { t } from 'ttag';

export const Header = () => {
  return (
    <Paper
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: 'var(--gradient)',
        paddingBottom: 1,
      }}
      component="header"
      variant="outlined"
      square
    >
      <Box sx={{ backgroundColor: '#fff', p: 2 }}>
        <Container maxWidth="lg">
          <Link to={routes.home}>
            <Typography className="gradient-text" style={{ width: 'min-content' }}>
              {t`Crocodile`}
            </Typography>
          </Link>
        </Container>
      </Box>
    </Paper>
  );
};
