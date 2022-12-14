import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';
import { useSocketActions } from '~/features/canvas/hooks/useSocketActions';
import { selectloading } from '~/features/canvas/slice/selectors';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/shared/hooks/react-redux';
import { PlayingArea } from '~/features/canvas/views';
import { clear, setLoading } from '~/features/canvas/slice';
import { t } from 'ttag';

interface RoomPageParams {
  roomId: string;
}

export const RoomPage = () => {
  const { roomId } = useParams<keyof RoomPageParams>() as RoomPageParams;
  const { state } = useLocation();

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectloading);

  const isAuthor = Boolean(state?.author) || false;

  const [socket, { joinTheGame }] = useSocketActions();

  useEffect(() => {
    dispatch(setLoading(true));
    joinTheGame(roomId);
  }, [socket]);

  useEffect(() => {
    return () => {
      dispatch(clear());
    };
  }, []);

  return (
    <>
      <Backdrop
        sx={{ zIndex: theme => theme.zIndex.drawer + 1, color: 'var(--accent1)' }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
          <span className="gradient-text">{t`Crocodile room: `}</span>
          {roomId}
        </Typography>
        <Box sx={{ mt: 4, maxWidth: 'min-content', mr: 'auto', ml: 'auto' }}>
          <PlayingArea isAuthor={isAuthor} />
        </Box>
      </Box>
    </>
  );
};
