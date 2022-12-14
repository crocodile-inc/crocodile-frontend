import { Box, Button, Slider, TextField } from '@mui/material';
import { useDebounceCallback } from '@react-hook/debounce';
import { useSocketActions } from '~/features/canvas/hooks/useSocketActions';
import { useAppDispatch, useAppSelector } from '~/shared/hooks/react-redux';
import { selectBackgroundColor } from '~/features/canvas/slice/selectors';
import {
  setStrokeColor as updateStrokeColor,
  setStrokeWidth as updateStrokeWidth,
} from '~/features/canvas/slice';
import { useEffect, useState } from 'react';
import { initialStrokeColor, initialStrokeWidth } from '~/features/canvas/constants';
import { t } from 'ttag';

export const Toolbar = () => {
  const dispatch = useAppDispatch();

  const [strokeColor, setStrokeColor] = useState(initialStrokeColor);
  const setStrokeColorDebounced = useDebounceCallback((color: string) => {
    dispatch(updateStrokeColor(color));
  }, 50);

  useEffect(() => {
    setStrokeColorDebounced(strokeColor);
  }, [strokeColor]);

  const [strokeWidth, setStrokeWidth] = useState(initialStrokeWidth);
  const setStrokeWidthDebounced = useDebounceCallback((width: number) => {
    dispatch(updateStrokeWidth(width));
  }, 50);

  useEffect(() => {
    setStrokeWidthDebounced(strokeWidth);
  }, [strokeWidth]);

  const backgroundColor = useAppSelector(selectBackgroundColor);
  const setBackgroundColorDebounced = useDebounceCallback((color: string) => {
    sendBackgroundColorToServer(color);
  }, 150);

  const [, { sendBackgroundColorToServer, clearPictureInRoom }] = useSocketActions();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 2,
      }}
    >
      <Slider
        value={strokeWidth}
        defaultValue={strokeWidth}
        onChange={(e, value) => setStrokeWidth(value as number)}
        valueLabelDisplay="auto"
        valueLabelFormat={value => t`Stroke width: ${value}`}
        step={4}
        sx={{ flexGrow: 1 }}
        marks
        min={2}
        max={62}
      />
      <TextField
        size="small"
        fullWidth
        sx={{ flexGrow: 1 }}
        type="color"
        value={strokeColor}
        onChange={e => setStrokeColor(e.target.value)}
        label={t`Stroke`}
        variant="outlined"
      />
      <TextField
        size="small"
        fullWidth
        sx={{ flexGrow: 1 }}
        type="color"
        value={backgroundColor}
        onChange={e => setBackgroundColorDebounced(e.target.value)}
        label={t`Background`}
        variant="outlined"
      />
      <Button fullWidth variant="outlined" onClick={clearPictureInRoom}>
        {t`Clear`}
      </Button>
    </Box>
  );
};
