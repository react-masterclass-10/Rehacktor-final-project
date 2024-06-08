import ButtonUI from '../components/GeneralComponents/ButtonUI';
import supabase from '../supabase/client';

function Register() {
  const handleRegister = async (event) => {
    event.preventDefault();
    const registerForm = event.currentTarget;
    const { username, nome, cognome, email, password } = Object.fromEntries(
      new FormData(registerForm)
    );
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            first_name: nome,
            last_name: cognome,
          },
        },
      });
      if (error) {
        // eslint-disable-next-line no-alert
        alert(error.error_description || error.message);
      } else {
        registerForm.reset();
        console.log('Tutto é andato a buon fine 🎉');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container py-5">
      <div className="row my-5 py-5 justify-content-center">
        <div className="col-12 col-md-6">
          <h2>Registrati come nuovo utente</h2>
          <form onSubmit={handleRegister} className="mt-5">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">
                Nome
              </label>
              <input
                type="text"
                className="form-control"
                id="nome"
                name="nome"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cognome" className="form-label">
                Cognome
              </label>
              <input
                type="text"
                className="form-control"
                id="cognome"
                name="cognome"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
              />
            </div>
            <div className="text-center">
              <ButtonUI>Registrati</ButtonUI>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
