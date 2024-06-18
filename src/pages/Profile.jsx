import { useContext, useEffect } from 'react';
import getProfileImg from '../utils/getProfileImg';
import Loading from '../components/GeneralComponents/Loading';
import supabase from '../supabase/client';
import AuthContext from '../contexts/AuthContext';
import useFavStore from '../store/useFavStore';

function Profile() {
  const { sessione, profile, loading } = useContext(AuthContext);
  const fav = useFavStore((state) => state.fav);
  const setFav = useFavStore((state) => state.setFav);

  const readFavUser = async () => {
    const { data: favourites, error } = await supabase
      .from('favourites')
      .select('*')
      .eq('profile_id', profile.id);
    if (error) {
      // eslint-disable-next-line no-alert
      alert(error.message);
    } else {
      console.log(favourites);
      setFav(favourites);
    }
  };

  const remove = async (id) => {
    const { error } = await supabase
      .from('favourites')
      .delete()
      .eq('game_id', id)
      .eq('profile_id', profile.id);
    if (error) {
      // eslint-disable-next-line no-alert
      alert(error.message);
    } else {
      readFavUser();
    }
  };

  useEffect(() => {
    readFavUser();
  }, []);

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
          <div className="col-12 col-md-6">
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  I tuoi preferiti
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  I tuoi messaggi
                </button>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
                tabIndex="0"
              >
                <ul>
                  {fav.map((game) => (
                    <li key={game.id}>
                      <div>
                        <p>{game.game_name}</p>
                        <button
                          type="button"
                          onClick={() => remove(game.game_id)}
                        >
                          Rimuovi dai preferiti
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
