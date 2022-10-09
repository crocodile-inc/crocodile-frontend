import { Stroke } from '~/features/canvas/models';
import { PointerEvent as PointerEventType, TouchEvent as TouchEventType } from 'react';

export const getCoords = (
  e: PointerEventType<HTMLCanvasElement> | TouchEventType<HTMLCanvasElement>,
) => {
  if (e.nativeEvent instanceof PointerEvent) {
    const { offsetX, offsetY } = e.nativeEvent;
    return { x: offsetX, y: offsetY };
  } else {
    const target = e.target as HTMLCanvasElement;
    const rect = target.getBoundingClientRect();
    const bodyRect = document.body.getBoundingClientRect();
    const clientX = e.nativeEvent.touches[0].pageX - (rect.left - bodyRect.left);
    const clientY = e.nativeEvent.touches[0].pageY - (rect.top - bodyRect.top);
    return { x: clientX, y: clientY };
  }
};

export const drawCircle = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  circleRadius: number,
  fillColor: string,
) => {
  context.fillStyle = fillColor;
  context.beginPath();
  context.arc(x, y, circleRadius, 0, 2 * Math.PI);
  context.fill();
  context.closePath();
};

export const drawStroke = (context: CanvasRenderingContext2D, stroke: Stroke) => {
  context.lineWidth = stroke.strokeWidth;
  context.strokeStyle = stroke.strokeColor;
  context.lineCap = 'round';
  const points = stroke.points;
  for (let i = 1; i <= points.length; i++) {
    if (i === 1) {
      context.closePath();
      const circleRadius = stroke.strokeWidth / 2;
      drawCircle(context, points[i - 1].x, points[i - 1].y, circleRadius, stroke.strokeColor);
    } else if (i < points.length) {
      context.beginPath();
      context.moveTo(points[i - 1].x, points[i - 1].y);
      context.lineTo(points[i].x, points[i].y);
      context.stroke();
      context.closePath();
    }
  }
};

export const isDrawing = (
  e: PointerEventType<HTMLCanvasElement> | TouchEventType<HTMLCanvasElement>,
) => {
  if (e.nativeEvent instanceof TouchEvent) {
    return e.nativeEvent.touches.length === 1;
  } else {
    return e.nativeEvent.buttons === 1;
  }
};
