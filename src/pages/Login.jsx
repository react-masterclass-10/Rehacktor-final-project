import { AiFillDiscord } from 'react-icons/ai';
import { FaTwitterSquare } from 'react-icons/fa';
// import supabase from '../supabase/client';
import { useNavigate } from 'react-router-dom';
import ButtonUI from '../components/GeneralComponents/ButtonUI';
import supabase from '../supabase/client';

function Login() {
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();
    const LoginForm = event.currentTarget;
    const { email, password } = Object.fromEntries(new FormData(LoginForm));
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        // eslint-disable-next-line no-alert
        alert(error.error_description || error.message);
      } else {
        navigate('/');
      }
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    }
  };

  return (
    <div className="container py-5">
      <div className="row my-5 py-5 justify-content-around">
        <div className="col-12 col-md-4 py-5">
          <h2>Accedi</h2>
          <form onSubmit={handleLogin} className="mt-5">
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
            <div className="text-center">
              <ButtonUI>Login</ButtonUI>
            </div>
          </form>
        </div>
        <div className="col-12 col-md-4 py-5">
          <h2>Fai login con social Auth</h2>
          <div className="mt-md-5" />
          <ButtonUI>
            Discord{' '}
            <a href="/" className="nav-link px-2 icons">
              <AiFillDiscord />
            </a>
          </ButtonUI>
          <ButtonUI>
            Twitter{' '}
            <a href="/" className="nav-link px-2 icons">
              <FaTwitterSquare />
            </a>
          </ButtonUI>
        </div>
      </div>
    </div>
  );
}

export default Login;
