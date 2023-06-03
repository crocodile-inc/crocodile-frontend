import { Box } from '@mui/material';
import { UnraveledPicture } from '~/features/gallery/components';
import { FC } from 'react';
import { UnraveledPicture as UnraveledPictureType } from '~/features/gallery/models';

interface Props {
  unraveled: UnraveledPictureType[];
}
export const UnraveledList: FC<Props> = ({ unraveled }) => {
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
