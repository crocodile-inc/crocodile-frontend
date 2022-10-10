import { Brightness4, Brightness7 } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { changeTheme } from '~/features/ui/slice';
import { selectTheme } from '~/features/ui/slice/selectors';
import { useAppDispatch, useAppSelector } from '~/shared/hooks/react-redux';

export const ToggleTheme = () => {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(selectTheme);

  return (
    <IconButton
      onClick={() => dispatch(changeTheme(currentTheme === 'light' ? 'dark' : 'light'))}
      color="inherit"
    >
      {currentTheme === 'dark' ? (
        <Brightness7 color="inherit" sx={{ color: 'var(--accent2)' }} />
      ) : (
        <Brightness4 color="inherit" sx={{ color: 'var(--accent2)' }} />
      )}
    </IconButton>
  );
};
