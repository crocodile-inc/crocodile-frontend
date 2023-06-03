import { Box, Typography } from '@mui/material';
import { UnraveledList } from '~/features/gallery/components';
import { t } from 'ttag';
import { useAppDispatch, useAppSelector } from '~/shared/hooks/react-redux';
import { selectUnraveled } from '~/features/gallery/slice/selectors';
import { useEffect } from 'react';
import { getUnraveled } from '~/features/gallery/slice/asyncThunks';

export const Gallery = () => {
  const dispatch = useAppDispatch();
  const unraveled = useAppSelector(selectUnraveled);

  useEffect(() => {
    dispatch(getUnraveled());
  }, []);

  if (!unraveled.length) {
    return null;
  }

  return (
    <Box>
      <Typography
        sx={{ textAlign: 'center', mt: 5 }}
        variant="h4"
        className="gradient-text text-center"
      >
        {t`Gallery`}
      </Typography>
      <UnraveledList unraveled={unraveled} />
    </Box>
  );
};
