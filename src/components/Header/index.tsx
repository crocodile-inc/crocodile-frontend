import { Box, Container, Paper, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { routes } from '~/routes';
import { t } from 'ttag';
import { ToggleTheme } from '~/features/ui/components/ToggleTheme';

export const Header = () => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        position: 'sticky',
        top: 0,
        border: 0,
        zIndex: 1000,
        background: 'var(--gradient)',
        paddingBottom: 1,
      }}
      component="header"
      variant="outlined"
      square
    >
      <Box sx={{ backgroundColor: theme.palette.background.default, p: 2 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Link to={routes.home} style={{ display: 'block', width: 'min-content' }}>
              <Typography className="gradient-text">{t`Crocodile`}</Typography>
            </Link>
            <ToggleTheme />
          </Box>
        </Container>
      </Box>
    </Paper>
  );
};
