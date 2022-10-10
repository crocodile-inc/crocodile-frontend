import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Theme } from '~/features/ui/components/AppThemeProvider';
import { APP_THEME_KEY } from '~/features/ui/constants';

interface UiState {
  theme: Theme;
}

const initialState: UiState = {
  theme: 'light',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<UiState['theme']>) {
      const theme = action.payload;
      localStorage.setItem(APP_THEME_KEY, theme);
      state.theme = theme;
    },
  },
});

export const { changeTheme } = uiSlice.actions;

export default uiSlice.reducer;
