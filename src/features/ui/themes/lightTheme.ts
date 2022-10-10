import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#32b772',
    },
    secondary: {
      main: '#dddd47',
    },
  },
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
  },
});
