import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import supabase from '../../supabase/client';
import AuthContext from '../../contexts/AuthContext';
import getProfileImg from '../../utils/getProfileImg';

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
  const navigate = useNavigate();
  const { sessione, profile } = useContext(AuthContext);
  const [scrolling, setScrolling] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        // eslint-disable-next-line no-alert
        alert(error);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
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
              {!sessione ? (
                <div>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <Tooltip title="User login">
                      <li className="nav-item mx-3">
                        <a
                          className="nav-link text-white"
                          href="#"
                          onClick={handleClick}
                          aria-controls={open ? 'account-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                        >
                          Accedi
                        </a>
                      </li>
                    </Tooltip>
                  </Box>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        backgroundColor: 'black',
                        color: 'white',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        '&::before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <PersonIcon
                          fontSize="small"
                          sx={{
                            color: 'white',
                          }}
                        />
                      </ListItemIcon>
                      <Link
                        style={{
                          color: 'white',
                          textDecoration: 'none',
                          fontFamily: '"Chakra Petch", sans-serif',
                        }}
                        to="/login"
                      >
                        Login
                      </Link>
                    </MenuItem>

                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <VpnKeyIcon
                          fontSize="small"
                          sx={{
                            color: 'white',
                          }}
                        />
                      </ListItemIcon>
                      <Link
                        style={{
                          color: 'white',
                          textDecoration: 'none',
                          fontFamily: '"Chakra Petch", sans-serif',
                        }}
                        to="/register"
                      >
                        Registrati
                      </Link>
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <div>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <Tooltip title="Account settings">
                      <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                      >
                        <Avatar
                          alt="user profile pic"
                          src={profile && getProfileImg(profile.avatar_url)}
                          sx={{ width: 32, height: 32 }}
                        />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        backgroundColor: 'black',
                        color: 'white',
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        '&::before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <PersonIcon
                          fontSize="small"
                          sx={{
                            color: 'white',
                          }}
                        />
                      </ListItemIcon>
                      <Link
                        style={{
                          color: 'white',
                          textDecoration: 'none',
                          fontFamily: '"Chakra Petch", sans-serif',
                        }}
                        to="/profile"
                      >
                        Profilo
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <SettingsIcon
                          fontSize="small"
                          sx={{
                            color: 'white',
                          }}
                        />
                      </ListItemIcon>
                      <Link
                        style={{
                          color: 'white',
                          textDecoration: 'none',
                          fontFamily: '"Chakra Petch", sans-serif',
                        }}
                        to="/settings"
                      >
                        Impostazioni
                      </Link>
                    </MenuItem>
                    <Divider />

                    <MenuItem onClick={handleSignOut}>
                      <ListItemIcon>
                        <ExitToAppIcon
                          fontSize="small"
                          sx={{
                            color: 'white',
                          }}
                        />
                      </ListItemIcon>
                      Esci
                    </MenuItem>
                  </Menu>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </motion.nav>
  );
}

export default NavbarUI;
