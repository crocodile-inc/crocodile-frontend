import { createSlice } from '@reduxjs/toolkit';
import { UnraveledPicture } from '~/features/gallery/models';
import { getUnraveled } from '~/features/gallery/slice/asyncThunks';

interface GalleryState {
  unraveled: UnraveledPicture[];
}

const initialState: GalleryState = {
  unraveled: [],
};

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUnraveled.fulfilled, (state, { payload }) => {
      state.unraveled = payload;
    });
  },
});

export const {} = gallerySlice.actions;

export default gallerySlice.reducer;
