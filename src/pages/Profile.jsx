import { useContext, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import useFavStore from '../store/useFavStore';
import AuthContext from '../contexts/AuthContext';
import supabase from '../supabase/client';
import Loading from '../components/GeneralComponents/Loading';
import getProfileImg from '../utils/getProfileImg';

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
            <div>
              <Accordion
                sx={{
                  fontFamily: '"Chakra Petch", sans-serif',
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3-content"
                  id="panel3-header"
                >
                  Lista Giochi preferiti
                </AccordionSummary>
                {fav.length !== 0 ? (
                  fav.map((game) => (
                    <AccordionDetails key={game.game_id}>
                      {game.game_name}
                      <AccordionActions>
                        <Button
                          onClick={() => remove(game.game_id)}
                          sx={{
                            fontFamily: '"Chakra Petch", sans-serif',
                          }}
                        >
                          Rimuovi dai preferiti <DeleteIcon />
                        </Button>
                      </AccordionActions>
                      <Divider />
                    </AccordionDetails>
                  ))
                ) : (
                  <AccordionDetails>
                    Non ci sono giochi preferiti al momento...
                  </AccordionDetails>
                )}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
