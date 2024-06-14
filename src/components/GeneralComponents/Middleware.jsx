import { useContext } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

function MiddlewareRoutes() {
  const { sessione } = useContext(AuthContext);
  const location = useLocation();
  if (!sessione) {
    return <Navigate to="/" replace state={{ path: location.pathname }} />;
  }
  return <Outlet />;
}

export default MiddlewareRoutes;
