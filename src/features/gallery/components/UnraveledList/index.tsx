import { useAppDispatch, useAppSelector } from '~/shared/hooks/react-redux';
import { selectUnraveled } from '~/features/gallery/slice/selectors';
import { useEffect } from 'react';
import { getUnraveled } from '~/features/gallery/slice/asyncThunks';
import { Box } from '@mui/material';
import { UnraveledPicture } from '~/features/gallery/components';

export const UnraveledList = () => {
  const dispatch = useAppDispatch();
  const unraveled = useAppSelector(selectUnraveled);

  useEffect(() => {
    dispatch(getUnraveled());
  }, []);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          md: 'repeat(3, minmax(0%, 33.33%))',
          sm: 'repeat(2, minmax(0%, 50%))',
          xs: 'repeat(2, minmax(0%, 50%))',
        },
        gridAutoFlow: 'row dense',
        gap: 2,
        mt: 2,
      }}
    >
      {unraveled.map(picture => (
        <UnraveledPicture key={picture.id} picture={picture} />
      ))}
    </Box>
  );
};
