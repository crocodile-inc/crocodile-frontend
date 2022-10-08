import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useSocketActions } from '~/features/canvas/hooks/useSocketActions';
import { reverse } from 'named-urls';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '~/routes';
import { Gallery } from '~/features/gallery/views';
import { t } from 'ttag';

export const HomePage = () => {
  const navigate = useNavigate();

  const [riddleForCreateRoom, setRiddleForCreateRoom] = useState<string>('');
  const [joinToRoomId, setJoinToRoomId] = useState<string>('');

  const [, { startNewGame }] = useSocketActions();

  return (
    <Box>
      <Typography sx={{ textAlign: 'center' }} variant="h3" className="gradient-text text-center">
        {t`Crocodile Game`}
      </Typography>
      <Typography sx={{ textAlign: 'center', mt: 2 }}>
        {t`Draw and win. Guess what others are drawing and win too! Here is everything you need to know about the game!`}
      </Typography>
      <Typography sx={{ mt: 2 }} variant="h5">
        {t`How it works?`}
      </Typography>
      <ol>
        <li>{t`Think of a riddle and create a room!`}</li>
        <li>{t`Invite your friends and start drawing!`}</li>
        <li>{t`Friends have to guess the word from the picture in the text chat!`}</li>
        <li>{t`The first person to guess your word wins!`}</li>
        <li>{t`The picture and the answer will go to the gallery!`}</li>
      </ol>
      <Box
        sx={{
          mt: 3,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            border: '1px solid black',
            p: 1,
            width: '100%',
          }}
        >
          <Typography
            sx={{ textAlign: 'center' }}
            variant="h5"
            className="gradient-text text-center"
          >
            {t`Create new room`}
          </Typography>
          <TextField
            size="small"
            fullWidth
            value={riddleForCreateRoom}
            onChange={e => setRiddleForCreateRoom(e.target.value)}
            label={t`Riddle`}
            variant="outlined"
          />
          <Button
            disabled={Boolean(!riddleForCreateRoom)}
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => startNewGame(riddleForCreateRoom)}
          >
            {t`Create`}
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            border: '1px solid black',
            p: 1,
            width: '100%',
          }}
        >
          <Typography
            sx={{ textAlign: 'center' }}
            variant="h5"
            className="gradient-text text-center"
          >
            {t`Join to room`}
          </Typography>
          <TextField
            size="small"
            fullWidth
            value={joinToRoomId}
            onChange={e => setJoinToRoomId(e.target.value)}
            label={t`Room id`}
            variant="outlined"
          />
          <Button
            disabled={Boolean(!joinToRoomId)}
            variant="outlined"
            startIcon={<ArrowForwardIcon />}
            onClick={() => navigate(reverse(routes.rooms.room, { roomId: joinToRoomId }))}
          >
            {t`Join`}
          </Button>
        </Box>
      </Box>
      <Gallery />
    </Box>
  );
};
