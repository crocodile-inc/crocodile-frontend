import { RootState } from '~/store';

export const selectInitialValues = (state: RootState) => state.canvas.initialValues;
export const selectStrokes = (state: RootState) => state.canvas.strokes;
export const selectCurrentRoomId = (state: RootState) => state.canvas.currentRoomId;
export const selectPicture = (state: RootState) => state.canvas.picture;
export const selectGuesses = (state: RootState) => state.canvas.guesses;
