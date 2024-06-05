import { Outlet } from 'react-router-dom';
import NavbarUI from '../components/NavbarUI';
import FooterUI from '../components/FooterUI';

function Layout() {
  return (
    <>
      <NavbarUI />
      <Outlet />
      <FooterUI />
    </>
  );
}

export default Layout;
