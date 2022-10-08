import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { routes } from '~/routes';

export const NotFoundPage = () => {
  return (
    <Box>
      <Typography className="gradient-text text-center" sx={{ textAlign: 'center' }} variant="h2">
        404
      </Typography>
      <Typography sx={{ textAlign: 'center' }} variant="h4">
        sorry but we can't find this page
      </Typography>
      <Link className="gradient-text text-center" to={routes.home}>
        {'< Go Home'}
      </Link>
    </Box>
  );
};
