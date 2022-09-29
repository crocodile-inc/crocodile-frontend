import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { routes } from '~/routes';

export const NotFoundPage = () => {
  return (
    <Box>
      <Typography sx={{ textAlign: 'center' }} variant="h2">
        404
      </Typography>
      <Typography sx={{ textAlign: 'center' }} variant="h4">
        sorry but we can't find this page
      </Typography>
      <Link to={routes.home}>{'< Go Home'}</Link>
    </Box>
  );
};
