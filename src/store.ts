import { configureStore } from '@reduxjs/toolkit';
import canvasReducer from '~/features/canvas/slice';
import galleryReducer from '~/features/gallery/slice';

export const store = configureStore({
  reducer: {
    canvas: canvasReducer,
    gallery: galleryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
