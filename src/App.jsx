import { RouterProvider } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import router from './routes/Routing';
import AuthContext from './contexts/AuthContext';
import useAuth from './hooks/useAuth';

export function App() {
  return (
    <AnimatePresence mode="wait">
      <RouterProvider router={router} />
    </AnimatePresence>
  );
}

export function Root() {
  const data = useAuth();
  return (
    <AuthContext.Provider value={data}>
      <App />
    </AuthContext.Provider>
  );
}
