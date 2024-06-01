import { Outlet } from 'react-router-dom';
import NavbarUI from '../components/NavbarUI';

function Layout() {
  return (
    <>
      <NavbarUI />
      <Outlet />
    </>
  );
}

export default Layout;
