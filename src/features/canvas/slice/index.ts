import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Picture } from '~/features/canvas/models/Picture';
import { Room } from '~/features/canvas/models/Room';
import { Stroke } from '~/features/canvas/models/Stroke';

interface CanvasState {
  currentRoomId: Room['id'] | undefined | null;
  picture: Picture | undefined;
  initialValues: {
    strokeWidth: number;
    strokeColor: string;
    backgroundColor: string;
  };
  strokes: Stroke[];
}

const initialState: CanvasState = {
  currentRoomId: undefined,
  picture: undefined,
  initialValues: {
    strokeWidth: 6,
    strokeColor: '#000000',
    backgroundColor: '#FFFFFF',
  },
  strokes: [],
};

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    initializePicture(state, { payload }: PayloadAction<Picture>) {
      state.picture = payload;
    },
    addStroke(state, { payload }: PayloadAction<Stroke>) {
      state.strokes.push(payload);
    },
    clear(state) {
      state.strokes = initialState.strokes;
    },
    setCurrentRoomId(state, { payload }: PayloadAction<CanvasState['currentRoomId']>) {
      state.currentRoomId = payload;
    },
    setBackgroundColor(state, { payload }: PayloadAction<Picture['backgroundColor']>) {
      if (state.picture) {
        state.picture.backgroundColor = payload;
      }
    },
  },
});

export const { initializePicture, addStroke, clear, setCurrentRoomId, setBackgroundColor } =
  canvasSlice.actions;

export default canvasSlice.reducer;
