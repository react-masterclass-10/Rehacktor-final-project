import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthContext from '../../contexts/AuthContext';
import supabase from '../../supabase/client';

const navTopStyle = {
  background: 'linear-gradient(rgba(0,0,0,0.9), transparent)',
  transition: '0.2s',
  padding: '2rem 1rem',
};

const navScrollingStyle = {
  backgroundColor: '#FEF836',
  borderBottom: '4px solid #00F0FF',
  transition: '0.2s',
};

const linksNav = {
  border: '2px solid var(--main-color)',
  padding: '5px 30px',
  backgroundColor: 'rgba(0,0,0, 0.4)',
  fontFamily: '"Chakra Petch", sans-serif',
  textTransform: 'uppercase',
  fontSize: '18px',
};

function NavbarUI() {
  const { sessione } = useContext(AuthContext);
  console.log(sessione);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <motion.nav
      variants={{
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      className="navbar navbar-expand-lg fixed-top"
      style={scrolling ? navScrollingStyle : navTopStyle}
      aria-label="Eighth navbar example"
    >
      <div className="container">
        <Link className="navbar-brand font-main fw-bold" to="/">
          Rehacktor
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample07"
          aria-controls="navbarsExample07"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample07">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0" style={linksNav}>
            <li className="nav-item mx-3">
              <Link
                className="nav-link text-white active"
                aria-current="page"
                to="/storage"
              >
                Tutti i giochi
              </Link>
            </li>
            <li className="nav-item mx-3">
              <a className="nav-link text-white" href="/">
                Archivio recensioni
              </a>
            </li>
            <li className="nav-item mx-3 dropdown">
              <a
                className="nav-link dropdown-toggle text-white"
                href="/"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {!sessione ? 'Accedi' : 'Benvenuto'}
              </a>
              {!sessione ? (
                <ul className="dropdown-menu rounded-0 links-nav">
                  <li className="my-3">
                    <Link
                      to="/register"
                      className="text-decoration-none text-white"
                    >
                      Registrati
                    </Link>
                  </li>
                  <li className="my-3">
                    <Link
                      to="/login"
                      className="text-decoration-none text-white"
                    >
                      Login
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="dropdown-menu rounded-0 links-nav">
                  <li className="my-3">
                    <Link to="/" className="text-decoration-none text-white">
                      settings
                    </Link>
                  </li>
                  <li className="my-3">
                    <Link to="/" className="text-decoration-none text-white">
                      Profile
                    </Link>
                  </li>
                  <li className="my-3">
                    <button
                      type="button"
                      className="btn font-main text-uppercase text-white"
                      onClick={signOut}
                    >
                      esci
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </motion.nav>
  );
}

export default NavbarUI;
