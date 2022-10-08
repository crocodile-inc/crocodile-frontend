import { Box, Typography } from '@mui/material';
import { useSocketActions } from '~/features/canvas/hooks/useSocketActions';
import { selectCurrentRoomId } from '~/features/canvas/slice/selectors';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/shared/hooks/react-redux';
import { PlayingArea } from '~/features/canvas/views';
import { clear } from '~/features/canvas/slice';

interface RoomPageParams {
  roomId: string;
}

export const RoomPage = () => {
  const { roomId } = useParams<keyof RoomPageParams>() as RoomPageParams;
  const { state } = useLocation();

  const dispatch = useAppDispatch();

  const currentRoomId = useAppSelector(selectCurrentRoomId);

  const isAuthor = Boolean(state?.author) || false;

  const [, { joinTheGame }] = useSocketActions();

  useEffect(() => {
    joinTheGame(roomId);
  }, [currentRoomId]);

  useEffect(() => {
    return () => {
      dispatch(clear());
    };
  });

  return (
    <Box>
      <Typography
        sx={{
          textAlign: 'center',
          fontSize: {
            lg: 50,
            md: 40,
            sm: 26,
            xs: 20,
          },
        }}
        variant="h3"
      >
        <span className="gradient-text">Crocodile room: </span>
        {roomId}
      </Typography>
      <Box sx={{ mt: 4 }}>
        <PlayingArea isAuthor={isAuthor} />
      </Box>
    </Box>
  );
};
