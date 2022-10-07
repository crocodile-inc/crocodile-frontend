import { Box } from '@mui/material';
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
import { FC, PointerEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/shared/hooks/react-redux';
import { drawCircle, drawStroke, getCoords } from '~/shared/utils/canvasUtils';
import { canvasSizes } from '~/features/canvas/constants';

interface CanvasProps {
  canEdit: boolean;
}

export const Canvas: FC<CanvasProps> = ({ canEdit }) => {
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

  const handleOnPointerUp = () => {
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
    <Box>
      <canvas
        ref={backgroundRef}
        width={canvasSizes.width}
        height={canvasSizes.height}
        style={{ zIndex: 10, border: '1px solid black' }}
      />
      <canvas
        ref={canvasRef}
        onPointerDown={canEdit ? handleOnPointerDown : undefined}
        onPointerMove={canEdit ? handleOnPointerMove : undefined}
        onPointerUp={canEdit ? handleOnPointerUp : undefined}
        width={canvasSizes.width}
        height={canvasSizes.height}
        style={{ position: 'absolute', zIndex: 11, top: 0, left: 0, border: '1px solid black' }}
      />
    </Box>
  );
};
