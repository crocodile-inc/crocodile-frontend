import { FC } from 'react';
import { Box } from '@mui/material';
import { useAppSelector } from '~/shared/hooks/react-redux';
import { selectIsGameFinished } from '~/features/canvas/slice/selectors';
import { Canvas, Chat, Toolbar } from '~/features/canvas/components';

interface PlayingAreaProps {
  isAuthor: boolean;
}

export const PlayingArea: FC<PlayingAreaProps> = ({ isAuthor }) => {
  const isGameFinished = useAppSelector(selectIsGameFinished);
  const canEdit = Boolean(isAuthor && !isGameFinished);

  return (
    <Box
      sx={{
        border: '1px solid black',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 2,
        mb: 2,
        boxShadow: '-5px 5px 30px 5px var(--accent1), 5px -5px 30px 5px var(--accent2)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          position: 'relative',
          overflowX: 'scroll',
        }}
      >
        <Canvas canEdit={canEdit} />
        <Chat isAuthor={isAuthor} />
      </Box>
      {canEdit && <Toolbar />}
    </Box>
  );
};
