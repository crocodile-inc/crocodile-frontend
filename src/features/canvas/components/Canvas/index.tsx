import { Box, useTheme } from '@mui/material';
import { useSocketActions } from '~/features/canvas/hooks/useSocketActions';
import { Point } from '~/features/canvas/models';
import {
  addStroke,
  setBackgroundColor,
  setBackgroundColor as updateBackgroundColor,
} from '~/features/canvas/slice';
import {
  selectBackgroundColor,
  selectRemote,
  selectStrokeColor,
  selectStrokeWidth,
} from '~/features/canvas/slice/selectors';
import { FC, PointerEvent, TouchEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/shared/hooks/react-redux';
import { drawCircle, drawStroke, getCoords, isDrawing } from '~/shared/utils/canvasUtils';
import { canvasSizes } from '~/features/canvas/constants';

interface CanvasProps {
  canEdit: boolean;
}

export const Canvas: FC<CanvasProps> = ({ canEdit }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const remote = useAppSelector(selectRemote);
  const strokeColor = useAppSelector(selectStrokeColor);
  const strokeWidth = useAppSelector(selectStrokeWidth);
  const backgroundColor = useAppSelector(selectBackgroundColor);

  const [socket, { sendStrokeToServer, subscribeToStrokes, subscribeToBackgroundColor }] =
    useSocketActions();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const context = canvasRef.current?.getContext('2d');

  const backgroundRef = useRef<HTMLCanvasElement>(null);
  const backgroundContext = backgroundRef.current?.getContext('2d');

  const [currentStrokePoints, setCurrentStrokePoints] = useState<Point[]>([]);

  useEffect(() => {
    if (remote && context) {
      context.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
      for (const stroke of remote.strokes) {
        drawStroke(context, stroke);
      }
    }
  }, [remote?.strokes, context]);

  useEffect(() => {
    if (remote?.backgroundColor) {
      setBackgroundColor(remote.backgroundColor);
    }
    if (backgroundContext) {
      backgroundContext.fillStyle = backgroundColor;
      backgroundContext.fillRect(0, 0, backgroundRef.current!.width, backgroundRef.current!.height);
    }
  }, [remote?.backgroundColor]);

  useEffect(() => {
    if (remote?.backgroundColor && backgroundColor !== remote?.backgroundColor) {
      dispatch(updateBackgroundColor(backgroundColor));
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
      dispatch(updateBackgroundColor(backgroundColor));
    });
    return () => {
      unsubscribeFomStrokes();
      unsubscribeFomBackgroundColor();
    };
  }, [socket, context]);

  const handleStartDrawing = (
    e: PointerEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>,
  ) => {
    if (context) {
      context.lineWidth = strokeWidth;
      context.strokeStyle = strokeColor;
      context.lineCap = 'round';
      context.lineJoin = 'bevel';
      const { x, y } = getCoords(e);
      drawCircle(context, x, y, strokeWidth / 2, strokeColor);
      context.beginPath();
      context.moveTo(x, y);
      setCurrentStrokePoints([{ x, y }]);
    }
  };

  const handleDrawing = (e: PointerEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    if (context && isDrawing(e)) {
      const { x, y } = getCoords(e);
      setCurrentStrokePoints(prev => [...prev, { x, y }]);
      context.lineTo(x, y);
      context.stroke();
    } else {
      context?.closePath();
    }
  };

  const handleStopDrawing = () => {
    if (context) {
      context.closePath();
      if (currentStrokePoints.length) {
        const stroke = {
          strokeColor,
          strokeWidth,
          points: currentStrokePoints,
        };
        sendStrokeToServer(stroke);
        setCurrentStrokePoints([]);
      }
    }
  };

  return (
    <Box>
      <canvas
        ref={backgroundRef}
        width={canvasSizes.width}
        height={canvasSizes.height}
        style={{ zIndex: 10, border: '1px solid transparent' }}
      />
      <canvas
        ref={canvasRef}
        onPointerDown={canEdit ? handleStartDrawing : undefined}
        onPointerMove={canEdit ? handleDrawing : undefined}
        onPointerCancel={canEdit ? handleStopDrawing : undefined}
        onPointerUp={canEdit ? handleStopDrawing : undefined}
        onTouchStart={canEdit ? handleStartDrawing : undefined}
        onTouchMove={canEdit ? handleDrawing : undefined}
        onTouchEnd={canEdit ? handleStopDrawing : undefined}
        width={canvasSizes.width}
        height={canvasSizes.height}
        style={{
          position: 'absolute',
          zIndex: 11,
          top: 0,
          left: 0,
          border: `1px solid ${theme.palette.divider}`,
          touchAction: 'none',
        }}
      />
    </Box>
  );
};
