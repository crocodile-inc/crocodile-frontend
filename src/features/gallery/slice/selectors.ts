import { RootState } from '~/store';

export const selectUnraveled = (state: RootState) => state.gallery.unraveled;
