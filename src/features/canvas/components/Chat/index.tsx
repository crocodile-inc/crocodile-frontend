import AddIcon from '@mui/icons-material/Add';
import { Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

const messages = [
  { id: '0', author: 'Oleg', text: 'mouse' },
  { id: '1', author: 'Dmitry', text: 'pen' },
  { id: '2', author: 'Ivan', text: 'cat' },
  { id: '3', author: 'Oleg', text: 'Mouse' },
  { id: '4', author: 'Ivan', text: 'Garage' },
  { id: '5', author: 'Anna', text: 'Dog' },
  { id: '6', author: 'Oleg', text: 'Fish' },
  { id: '7', author: 'Nikita', text: 'Bulldog' },
];

export const Chat = () => {
  const initialCoolDown = 3;
  const [message, setMessage] = useState('');
  const [coolDown, setCoolDown] = useState(initialCoolDown);

  useEffect(() => {
    if (coolDown > 0) {
      const timeoutId = setTimeout(() => setCoolDown(collDown => collDown - 1), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [coolDown]);

  return (
    <Box sx={{ border: '1px solid black', p: 2 }}>
      <Box sx={{ overflowY: 'scroll', p: 1 }}>
        {messages.map(message => (
          <Box key={message.id}>{`${message.author}: ${message.text}`}</Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        <TextField
          size="small"
          fullWidth
          value={message}
          onChange={e => setMessage(e.target.value)}
          label="Word"
          variant="outlined"
        />
        <Button
          disabled={Boolean(!message || coolDown > 0)}
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => {
            setMessage('');
            setCoolDown(initialCoolDown);
          }}
        >
          {coolDown > 0 ? coolDown : 'Send'}
        </Button>
      </Box>
    </Box>
  );
};
