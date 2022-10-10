import './App.css';
import { Layout } from '~/components/Layout';
import { HomePage, NotFoundPage, RoomPage } from '~/pages';
import { Route, Routes } from 'react-router-dom';
import { routes } from '~/routes';
import { useAppDispatch } from '~/shared/hooks/react-redux';
import { useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { APP_THEME_KEY } from '~/features/ui/constants';
import { changeTheme } from '~/features/ui/slice';

function App() {
  const dispatch = useAppDispatch();

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    const appTheme = localStorage.getItem(APP_THEME_KEY);
    if (appTheme && (appTheme === 'light' || appTheme === 'dark')) {
      dispatch(changeTheme(appTheme));
    } else if (prefersDarkMode) {
      dispatch(changeTheme('dark'));
    }
  }, [dispatch, prefersDarkMode]);

  return (
    <Layout>
      <Routes>
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.rooms.room} element={<RoomPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
