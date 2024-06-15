import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import supabase from '../supabase/client';
import Avatar from '../components/SettingsComponents/Avatar';

function Settings() {
  const navigate = useNavigate();
  const { sessione } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [first_name, setfirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [bio, setBio] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      setLoading(true);
      const { user } = sessione;

      const { data, error } = await supabase
        .from('profiles')
        .select(`username, first_name, last_name, avatar_url, bio`)
        .eq('id', user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          console.log(data);
          setUsername(data.username);
          setfirstName(data.first_name);
          setLastName(data.last_name);
          setAvatarUrl(data.avatar_url);
          setBio(data.bio);
        }
      }

      setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [sessione]);

  async function updateProfile(event, avatarUrl) {
    event.preventDefault();

    setLoading(true);
    const { user } = sessione;

    const updates = {
      id: user.id,
      username,
      first_name,
      last_name,
      avatar_url,
      bio,
      updated_at: new Date(),
    };

    const { error } = await supabase.from('profiles').upsert(updates);

    if (error) {
      // eslint-disable-next-line no-alert
      alert(error.message);
    } else {
      setAvatarUrl(avatarUrl);
      navigate('/profile');
    }
    setLoading(false);
  }

  return (
    <div className="container-fluid">
      <div className="container my-5 py-5">
        <div className="row py-5">
          <div className="col-12 col-md-4">
            <h1>Setting Profile {sessione.user.user_metadata.first_name}</h1>
            <form onSubmit={updateProfile} className="form-widget">
              <Avatar
                url={avatar_url}
                size={150}
                onUpload={(event, url) => {
                  updateProfile(event, url);
                }}
              />
              <div className="mb-3">
                <label htmlFor="email" className="form-label font-main">
                  Email
                </label>
                <input
                  id="email"
                  className="form-control rounded-0 border-2 border-black bg-transparent font-main"
                  type="text"
                  value={sessione.user.email}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label font-main">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control rounded-0 border-2 border-black bg-transparent font-main"
                  id="username"
                  name="username"
                  placeholder="username"
                  value={username || ''}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="first_name" className="form-label font-main">
                  Nome
                </label>
                <input
                  type="text"
                  className="form-control rounded-0 border-2 border-black bg-transparent font-main"
                  id="first_name"
                  name="first_name"
                  placeholder="first name"
                  value={first_name || ''}
                  onChange={(e) => setfirstName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="last_name" className="form-label font-main">
                  Cognome
                </label>
                <input
                  type="text"
                  className="form-control rounded-0 border-2 border-black bg-transparent font-main"
                  id="last_name"
                  name="last_name"
                  placeholder="last name"
                  value={last_name || ''}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="bio" className="form-label font-main">
                  Bio
                </label>
                <textarea
                  type="text"
                  className="form-control rounded-0 border-2 border-black bg-transparent font-main"
                  id="bio"
                  name="bio"
                  placeholder="bio..."
                  value={bio || ''}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>

              <div>
                <button
                  className="btn btn-info rounded-0 border-1 font-main fw-bold px-5 py-3 text-uppercase"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Loading ...' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
