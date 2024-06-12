import { RouterProvider } from 'react-router-dom';
import router from './routes/Routing';
import AuthContext from './contexts/AuthContext';
import useAuth from './hooks/useAuth';

export function App() {
  return <RouterProvider router={router} />;
}

export function Root() {
  const data = useAuth();
  return (
    <AuthContext.Provider value={data}>
      <App />
    </AuthContext.Provider>
  );
}
