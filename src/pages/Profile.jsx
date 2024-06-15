import { useState, useEffect, useContext } from 'react';
import getProfileImg from '../utils/getProfileImg';
import Loading from '../components/GeneralComponents/Loading';
import supabase from '../supabase/client';
import AuthContext from '../contexts/AuthContext';

function Profile() {
  const { sessione } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      setLoading(true);
      const { user } = sessione;

      const { data, error } = await supabase
        .from('profiles')
        .select(`*`)
        .eq('id', user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setProfile(data);
        }
      }

      setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [sessione]);

  return (
    <div className="container-fluid">
      <div className="container my-5 py-5">
        <div className="row my-5 py-5">
          {loading && <Loading />}
          <div className="col-12 col-md-5">
            {profile ? (
              <div className="card p-5 bg-dark rounded-0 text-white font-main">
                <img
                  src={profile && getProfileImg(profile.avatar_url)}
                  alt="profile"
                  width={100}
                />
                <h1 className="text-white">
                  Benvenuto{' '}
                  {profile &&
                    (profile.first_name ||
                      sessione.user.user_metadata.first_name)}
                </h1>
                <div>
                  <ul className="list-unstyled">
                    <li className="mt-2">
                      <span>Username</span>
                      <span className="acc-color ms-2">{profile.username}</span>
                    </li>
                    <li className="mt-2">
                      <span>Name</span>
                      <span className="acc-color ms-2">
                        {profile.first_name}
                      </span>
                    </li>
                    <li className="mt-2">
                      <span>Surname</span>
                      <span className="acc-color ms-2">
                        {profile.last_name}
                      </span>
                    </li>
                    <li className="mt-2">
                      <span>Bio</span>
                      <span className="acc-color ms-2">{profile.bio}</span>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <p>aspetta...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
