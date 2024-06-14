import { Outlet } from 'react-router-dom';
import NavbarUI from '../components/GeneralComponents/NavbarUI';
import FooterUI from '../components/GeneralComponents/FooterUI';

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
