import { Box, Typography } from '@mui/material';
import { UnraveledList } from '~/features/gallery/components';

export const Gallery = () => {
  return (
    <Box>
      <Typography
        sx={{ textAlign: 'center', mt: 4 }}
        variant="h4"
        className="gradient-text text-center"
      >
        Gallery
      </Typography>
      <UnraveledList />
    </Box>
  );
};
