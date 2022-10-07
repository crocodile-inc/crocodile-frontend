import { createAsyncThunk } from '@reduxjs/toolkit';
import { GalleryService } from '~/features/gallery/services/galleryService';

export const getUnraveled = createAsyncThunk('gallery/getUnraveled', async () => {
  const response = await GalleryService.getUnraveled();
  return response.data;
});
