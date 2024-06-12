import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import NavbarUI from '../components/GeneralComponents/NavbarUI';
import FooterUI from '../components/GeneralComponents/FooterUI';

function Layout() {
  return (
    <AnimatePresence mode="wait" initial>
      <NavbarUI />
      <Outlet />
      <FooterUI />
    </AnimatePresence>
  );
}

export default Layout;
