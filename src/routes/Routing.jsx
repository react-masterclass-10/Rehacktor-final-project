import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Layout from '../layout/Layout';
import Home from '../pages/Home';
import Storage, { getGenres } from '../pages/Storage';
import Genre from '../pages/Genre';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Game, { getGameDetails } from '../pages/Game';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import MiddlewareRoutes from '../components/GeneralComponents/Middleware';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route
        path="/storage"
        element={<Storage />}
        loader={async () => {
          const genres = await getGenres();
          return { genres };
        }}
      />
      <Route path="/games/:genre/:id" element={<Genre />} />
      <Route
        path="/game/:gameslug/:id"
        element={<Game />}
        loader={getGameDetails}
      />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route element={<MiddlewareRoutes />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Route>
  )
);

export default router;
