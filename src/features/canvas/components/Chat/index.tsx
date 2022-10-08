import AddIcon from '@mui/icons-material/Add';
import { Box, Button, TextField, Typography } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/shared/hooks/react-redux';
import { selectGuesses } from '~/features/canvas/slice/selectors';
import { useSocketActions } from '~/features/canvas/hooks/useSocketActions';
import { addGuess } from '~/features/canvas/slice';
import { canvasSizes, chatCoolDown } from '~/features/canvas/constants';
import styles from './Chat.module.css';
import classNames from 'classnames';
import { t } from 'ttag';

interface ChatProps {
  isAuthor: boolean;
}

export const Chat: FC<ChatProps> = ({ isAuthor }) => {
  const dispatch = useAppDispatch();

  const [author, setAuthor] = useState(isAuthor ? 'Author' : '');
  const [guess, setGuess] = useState('');
  const [coolDown, setCoolDown] = useState(chatCoolDown);

  const guessScrollRef = useRef<HTMLDivElement>();

  const guesses = useAppSelector(selectGuesses);

  const [socket, { sendGuessToServer, subscribeToGuesses }] = useSocketActions();

  useEffect(() => {
    const unsubscribeFromGuesses = subscribeToGuesses(guess => {
      dispatch(addGuess(guess));
    });
    return () => {
      unsubscribeFromGuesses();
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minWidth: '450px',
        border: '1px solid black',
        p: 2,
        height: `${canvasSizes.height}px`,
        maxHeight: `${canvasSizes.height}px`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'scroll',
          p: 1,
          flexGrow: 1,
          gap: 0.5,
        }}
        ref={guessScrollRef}
      >
        {guesses.map(guess => {
          if (!guess.victorious) {
            return (
              <div
                key={guess.id}
                className={classNames(styles.wrapper, { [styles.author]: author === guess.author })}
              >
                <Typography
                  className={classNames(styles.message, {
                    [styles.author]: author === guess.author,
                  })}
                >
                  <span className="gradient-text">{guess.author}: </span>
                  {guess.guess}
                </Typography>
              </div>
            );
          } else {
            return (
              <Typography className={styles.victorious} key={guess.id}>
                <span className="gradient-text">
                  {guess.author} {t`won, riddle word: `}
                </span>
                {guess.guess}
              </Typography>
            );
          }
        })}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.5, mt: 2 }}>
        {!isAuthor && (
          <TextField
            sx={{ width: '30%' }}
            size="small"
            fullWidth
            value={author}
            onChange={e => setAuthor(e.target.value)}
            label={t`Name`}
            variant="outlined"
          />
        )}
        <TextField
          size="small"
          value={guess}
          sx={{ flexGrow: 1 }}
          onChange={e => setGuess(e.target.value)}
          label={isAuthor ? t`Hint` : t`Guess`}
          variant="outlined"
        />
        <Button
          disabled={Boolean(!guess || !author || coolDown > 0)}
          variant="outlined"
          startIcon={<AddIcon />}
          size="small"
          onClick={() => {
            sendGuessToServer(guess, author);
            setGuess('');
            setCoolDown(chatCoolDown);
          }}
        >
          {coolDown > 0 ? coolDown : t`Send`}
        </Button>
      </Box>
    </Box>
  );
};
