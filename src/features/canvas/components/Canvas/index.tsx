import { Box, Button, Slider, TextField } from '@mui/material';
import { useDebounce } from '@react-hook/debounce';
import { useSocketActions } from '~/features/canvas/hooks/useSocketActions';
import { Point } from '~/features/canvas/models/Point';
import {
  addStroke,
  clear,
  setBackgroundColor as updateBackgroundColor,
} from '~/features/canvas/slice';
import { selectInitialValues, selectPicture } from '~/features/canvas/slice/selectors';
import { PointerEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/shared/hooks/react-redux';
import { drawCircle, drawStroke, getCoords } from '~/shared/utils/canvasUtils';

export const Canvas = () => {
  const dispatch = useAppDispatch();
  const initialValues = useAppSelector(selectInitialValues);
  const picture = useAppSelector(selectPicture);

  const [
    ,
    {
      sendStrokeToServer,
      subscribeToStrokes,
      sendBackgroundColorToServer,
      subscribeToBackgroundColor,
      clearPictureInRoom,
    },
  ] = useSocketActions();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const context = canvasRef.current?.getContext('2d');

  const backgroundRef = useRef<HTMLCanvasElement>(null);
  const backgroundContext = backgroundRef.current?.getContext('2d');

  const [strokeWidth, setLineWidth] = useState(initialValues.strokeWidth);
  const [strokeColor, setStrokeColor] = useState(initialValues.strokeColor);
  const [backgroundColor, setBackgroundColor] = useDebounce(initialValues.backgroundColor, 350);

  const [currentStrokePoints, setCurrentStrokePoints] = useState<Point[]>([]);

  const width = 1116;
  const height = 600;

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = width;
      canvasRef.current.height = height;
    }
    if (backgroundRef.current) {
      backgroundRef.current.width = width;
      backgroundRef.current.height = height;
    }
  }, [canvasRef.current, backgroundRef.current]);

  useEffect(() => {
    dispatch(clear());
    if (picture && context) {
      context.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
      for (const stroke of picture.strokes) {
        drawStroke(context, stroke);
      }
    }
  }, [picture?.strokes, context]);

  useEffect(() => {
    if (picture?.backgroundColor) {
      setBackgroundColor(picture.backgroundColor);
    }
  }, [picture?.backgroundColor]);

  useEffect(() => {
    if (backgroundColor !== picture?.backgroundColor) {
      dispatch(updateBackgroundColor(backgroundColor));
      sendBackgroundColorToServer(backgroundColor);
    }
    if (backgroundContext) {
      backgroundContext.fillStyle = backgroundColor;
      backgroundContext.fillRect(0, 0, backgroundRef.current!.width, backgroundRef.current!.height);
    }
  }, [backgroundColor]);

  useEffect(() => {
    const unsubscribeFomStrokes = subscribeToStrokes(stroke => {
      dispatch(addStroke(stroke));
      if (context) {
        drawStroke(context, stroke);
      }
    });
    const unsubscribeFomBackgroundColor = subscribeToBackgroundColor(backgroundColor => {
      setBackgroundColor(backgroundColor);
      dispatch(updateBackgroundColor(backgroundColor));
    });
    return () => {
      unsubscribeFomStrokes();
      unsubscribeFomBackgroundColor();
    };
  }, [context]);

  const handleOnPointerDown = (e: PointerEvent<HTMLCanvasElement>) => {
    if (context) {
      context.lineWidth = strokeWidth;
      context.strokeStyle = strokeColor;
      context.lineCap = 'round';
      const coords = getCoords(e);
      drawCircle(context, coords.from.x, coords.from.y, strokeWidth / 2, strokeColor);
      setCurrentStrokePoints([{ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }]);
    }
  };

  const handleOnPointerMove = (e: PointerEvent<HTMLCanvasElement>) => {
    if (context && e.buttons > 0) {
      const coords = getCoords(e);
      setCurrentStrokePoints(prev => [...prev, { x: coords.to.x, y: coords.to.y }]);
      context.beginPath();
      context.moveTo(coords.from.x, coords.from.y);
      context.lineTo(coords.to.x, coords.to.y);
      context.stroke();
    }
  };

  const handleOnPointerUp = (e: PointerEvent<HTMLCanvasElement>) => {
    if (context) {
      context.closePath();
      if (currentStrokePoints.length) {
        const stroke = {
          strokeColor,
          strokeWidth,
          points: currentStrokePoints,
        };
        sendStrokeToServer(stroke);
      }
    }
  };

  return (
    <Box sx={{ border: '1px solid black', display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      <Box sx={{ position: 'relative', overflowX: 'scroll' }}>
        <canvas
          ref={backgroundRef}
          width={width}
          height={height}
          style={{ zIndex: 10, border: '1px solid black' }}
        />
        <canvas
          ref={canvasRef}
          onPointerDown={handleOnPointerDown}
          onPointerMove={handleOnPointerMove}
          onPointerUp={handleOnPointerUp}
          width={width}
          height={height}
          style={{ position: 'absolute', zIndex: 11, top: 0, left: 0, border: '1px solid black' }}
        />
      </Box>
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
          defaultValue={initialValues.strokeWidth}
          onChange={(e, value) => setLineWidth(value as number)}
          valueLabelDisplay="auto"
          valueLabelFormat={value => `Stroke width: ${value}`}
          step={4}
          marks
          min={2}
          max={62}
        />
        <TextField
          size="small"
          fullWidth
          type="color"
          value={strokeColor}
          onChange={e => setStrokeColor(e.target.value)}
          label="Stroke"
          variant="outlined"
        />
        <TextField
          size="small"
          fullWidth
          type="color"
          value={backgroundColor}
          onChange={e => setBackgroundColor(e.target.value)}
          label="Background"
          variant="outlined"
        />
        <Button variant="outlined" onClick={clearPictureInRoom}>
          Clear
        </Button>
      </Box>
    </Box>
  );
};
