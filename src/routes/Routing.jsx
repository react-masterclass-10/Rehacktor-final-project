import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Layout from '../layout/Layout';
import Home from '../pages/Home';
import Archivio from '../pages/Archivio';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/storage" element={<Archivio />} />
    </Route>
  )
);

export default router;
