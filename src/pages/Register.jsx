import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ButtonUI from '../components/GeneralComponents/ButtonUI';
import supabase from '../supabase/client';

function Register() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const registerForm = event.currentTarget;
    const { username, email, password } = Object.fromEntries(
      new FormData(registerForm)
    );
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });
      if (error) {
        // eslint-disable-next-line no-alert
        handleClick({ vertical: 'top', horizontal: 'center' });
        // alert(error.error_description || error.message);
      } else {
        registerForm.reset();
        console.log(data);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container py-5">
      <div className="row my-5 py-5 justify-content-center">
        <div className="col-12 col-md-5 py-5">
          <h2>Registrati come nuovo utente</h2>
          <form onSubmit={handleRegister} className="mt-5">
            <div className="mb-3">
              <label htmlFor="username" className="form-label font-main">
                Username
              </label>
              <input
                type="text"
                className="form-control rounded-0 border-2 border-black bg-transparent font-main"
                id="username"
                name="username"
                placeholder="Nickname here"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label font-main">
                Email
              </label>
              <input
                type="email"
                className="form-control rounded-0 border-2 border-black bg-transparent font-main"
                id="email"
                name="email"
                placeholder="name@gmail.com"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label font-main">
                Password
              </label>
              <input
                type="password"
                className="form-control rounded-0 border-2 border-black bg-transparent font-main"
                id="password"
                name="password"
                placeholder="supersecret"
              />
            </div>
            <div className="font-main text-center">
              <Link to="/login" className="text-reset">
                Login
              </Link>{' '}
              se sei giá registrato
            </div>
            <div className="text-center">
              <ButtonUI>registrati</ButtonUI>
            </div>
          </form>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleClose}
          severity="warning"
          sx={{ width: '100%', fontFamily: '"Chakra Petch", sans-serif' }}
        >
          <AlertTitle
            sx={{ width: '100%', fontFamily: '"Chakra Petch", sans-serif' }}
          >
            Process Registration
          </AlertTitle>
          Verifica di essere correttamete registrato
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Register;
