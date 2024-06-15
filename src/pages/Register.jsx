import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
// import { FirstPage } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import supabase from '../supabase/client';
import ButtonUI from '../components/GeneralComponents/ButtonUI';

const schema = z.object({
  username: z.string().min(1, { message: 'Username required 👿' }),
  name: z.string().min(1, { message: 'Name required 🤑' }),
  email: z.string().email({ message: 'Invalid email address 🤡' }),
  password: z.string().min(5, { message: 'Must be 5 or more characters long' }),
});

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

  // METODO DI REGISTRAZIONE CON REACT HOOK FORM E ZOD VALIDATION SCHEMA
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({ username, name, email, password }) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: name,
            username,
          },
        },
      });
      if (error) {
        // eslint-disable-next-line no-alert
        handleClick({ vertical: 'top', horizontal: 'center' });
        // alert(error.error_description || error.message);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // METODO DI REGISTRAZIONE SENZA REACT HOOK FORM E ZOD VALIDATION SCHEMA
  // const handleRegister = async (event) => {
  //   event.preventDefault();
  //   const registerForm = event.currentTarget;
  //   const { username, name, email, password } = Object.fromEntries(
  //     new FormData(registerForm)
  //   );
  //   try {
  //     const { error } = await supabase.auth.signUp({
  //       email,
  //       password,
  //       options: {
  //         data: {
  //           first_name: name,
  //           username,
  //         },
  //       },
  //     });
  //     if (error) {
  //       // eslint-disable-next-line no-alert
  //       handleClick({ vertical: 'top', horizontal: 'center' });
  //       // alert(error.error_description || error.message);
  //     } else {
  //       registerForm.reset();
  //       navigate('/');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="container py-5">
      <div className="row my-5 py-5 justify-content-center">
        <div className="col-12 col-md-5 py-5">
          <h2>Registrati come nuovo utente</h2>
          {/* Form html con React-hook-form */}
          <form
            onSubmit={handleSubmit((formData) => onSubmit(formData))}
            className="mt-5"
          >
            <div className="mb-3">
              <label htmlFor="username" className="form-label font-main">
                Username
              </label>
              <input
                name="username"
                id="username"
                type="text"
                className={`form-control rounded-0 border-2 border-black bg-transparent font-main ${errors.username?.message && 'is-invalid'}`}
                placeholder="Username here"
                {...register('username')}
              />
              <div id="validationServer03Feedback" className="invalid-feedback">
                {errors.username?.message && (
                  <p className="m-0 p-0 font-main">
                    {errors.username?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label font-main">
                Nome
              </label>
              <input
                name="name"
                id="name"
                type="text"
                className={`form-control rounded-0 border-2 border-black bg-transparent font-main ${errors.name?.message && 'is-invalid'}`}
                placeholder="Mario"
                {...register('name')}
              />
              <div id="validationServer03Feedback" className="invalid-feedback">
                {errors.name?.message && (
                  <p className="m-0 p-0 font-main">{errors.name?.message}</p>
                )}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label font-main">
                Email
              </label>
              <input
                name="email"
                id="email"
                type="email"
                className={`form-control rounded-0 border-2 border-black bg-transparent font-main ${errors.email?.message && 'is-invalid'}`}
                placeholder="Indirizzo email"
                {...register('email')}
              />
              <div id="validationServer03Feedback" className="invalid-feedback">
                {errors.email?.message && (
                  <p className="m-0 p-0 font-main">{errors.email?.message}</p>
                )}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label font-main">
                Password
              </label>
              <input
                name="password"
                id="password"
                type="password"
                className={`form-control rounded-0 border-2 border-black bg-transparent font-main ${errors.password?.message && 'is-invalid'}`}
                placeholder="supersecret"
                {...register('password')}
              />
              <div id="validationServer03Feedback" className="invalid-feedback">
                {errors.password?.message && (
                  <p className="m-0 p-0 font-main">
                    {errors.password?.message}
                  </p>
                )}
              </div>
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
          {/* Form html senza React-hook-form */}
          {/* <form onSubmit={handleRegister} className="mt-5">
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
              <label htmlFor="name" className="form-label font-main">
                Nome
              </label>
              <input
                type="text"
                className="form-control rounded-0 border-2 border-black bg-transparent font-main"
                id="name"
                name="name"
                placeholder="Mario"
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
          </form> */}
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
