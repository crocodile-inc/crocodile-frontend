import { Box, Typography } from '@mui/material';
import { Canvas } from '~/features/canvas/components/Canvas';
import { Chat } from '~/features/canvas/components/Chat';
import { useSocketActions } from '~/features/canvas/hooks/useSocketActions';
import { selectCurrentRoomId } from '~/features/canvas/slice/selectors';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '~/shared/hooks/react-redux';

interface RoomPageParams {
  roomId: string;
}

export const RoomPage = () => {
  const { roomId } = useParams<keyof RoomPageParams>() as RoomPageParams;

  const currentRoomId = useAppSelector(selectCurrentRoomId);

  const [, { joinTheGame }] = useSocketActions();

  useEffect(() => {
    joinTheGame(roomId);
  }, [currentRoomId]);

  return (
    <Box>
      <Typography sx={{ textAlign: 'center' }} variant="h3">
        {`Crocodile room: ${roomId}`}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2, gap: 2 }}>
        <Box>
          <Canvas />
        </Box>
        <Box>
          <Chat />
        </Box>
      </Box>
    </Box>
  );
};
