import './App.css';
import { Layout } from '~/components/Layout';
import { HomePage, NotFoundPage, RoomPage } from '~/pages';
import { Route, Routes } from 'react-router-dom';
import { routes } from '~/routes';

function App() {
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
