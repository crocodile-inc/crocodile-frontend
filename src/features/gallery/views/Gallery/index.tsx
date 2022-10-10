import { Box, Typography } from '@mui/material';
import { UnraveledList } from '~/features/gallery/components';
import { t } from 'ttag';

export const Gallery = () => {
  return (
    <Box>
      <Typography
        sx={{ textAlign: 'center', mt: 5 }}
        variant="h4"
        className="gradient-text text-center"
      >
        {t`Gallery`}
      </Typography>
      <UnraveledList />
    </Box>
  );
};
