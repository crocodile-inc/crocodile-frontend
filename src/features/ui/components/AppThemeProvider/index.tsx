import { CssBaseline, ThemeProvider } from '@mui/material';
import { selectTheme } from '~/features/ui/slice/selectors';
import { darkTheme } from '~/features/ui/themes/darkTheme';
import { lightTheme } from '~/features/ui/themes/lightTheme';
import { FC, ReactNode } from 'react';
import { useAppSelector } from '~/shared/hooks/react-redux';

export type Theme = 'light' | 'dark';

interface Props {
  children: ReactNode;
}

export const AppThemeProvider: FC<Props> = ({ children }) => {
  const currentTheme = useAppSelector(selectTheme);

  let theme;
  switch (currentTheme) {
    case 'light': {
      theme = lightTheme;
      break;
    }
    case 'dark': {
      theme = darkTheme;
      break;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
