import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Layout from '../layout/Layout';
import Home from '../pages/Home';
import AltraPagina from '../pages/AltraPagina';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/altrapagina" element={<AltraPagina />} />
    </Route>
  )
);

export default router;
