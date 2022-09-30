import AddIcon from '@mui/icons-material/Add';
import { Box, Button, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/shared/hooks/react-redux';
import { selectGuesses } from '~/features/canvas/slice/selectors';
import { useSocketActions } from '~/features/canvas/hooks/useSocketActions';
import { addGuess } from '~/features/canvas/slice';

export const Chat = () => {
  const dispatch = useAppDispatch();
  const initialCoolDown = 3;
  const [author, setAuthor] = useState('');
  const [guess, setGuess] = useState('');
  const [coolDown, setCoolDown] = useState(initialCoolDown);
  const guessScrollRef = useRef<HTMLDivElement>();

  const guesses = useAppSelector(selectGuesses);

  const [socket, { sendGuessToServer, subscribeToGuesses }] = useSocketActions();

  useEffect(() => {
    const unsubscribeFomGuesses = subscribeToGuesses(guess => {
      dispatch(addGuess(guess));
    });
    return () => {
      unsubscribeFomGuesses();
    };
  }, [socket]);

  useEffect(() => {
    if (coolDown > 0) {
      const timeoutId = setTimeout(() => setCoolDown(collDown => collDown - 1), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [coolDown]);

  useEffect(() => {
    if (guessScrollRef.current) {
      guessScrollRef.current.scrollTop = guessScrollRef.current.scrollHeight;
    }
  }, [guessScrollRef.current, guesses]);

  return (
    <Box sx={{ border: '1px solid black', p: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'scroll',
          p: 1,
          maxHeight: '200px',
          gap: 1,
        }}
        ref={guessScrollRef}
      >
        {guesses.map(guess => (
          <Box
            sx={{
              width: 'max-content',
              alignSelf: author === guess.author ? 'end' : 'start',
              border: '1px solid black',
              p: 0.5,
            }}
            key={guess.id}
          >{`${guess.author}: ${guess.guess}`}</Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, mt: 2 }}>
        <TextField
          sx={{ width: '30%' }}
          size="small"
          fullWidth
          value={author}
          onChange={e => setAuthor(e.target.value)}
          label="Author"
          variant="outlined"
        />
        <TextField
          size="small"
          fullWidth
          value={guess}
          onChange={e => setGuess(e.target.value)}
          label="Guess"
          variant="outlined"
        />
        <Button
          disabled={Boolean(!guess || !author || coolDown > 0)}
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => {
            sendGuessToServer(guess, author);
            setGuess('');
            setCoolDown(initialCoolDown);
          }}
        >
          {coolDown > 0 ? coolDown : 'Send'}
        </Button>
      </Box>
    </Box>
  );
};
