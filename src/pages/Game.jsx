import { useLoaderData } from 'react-router-dom';
import { motion } from 'framer-motion';
import Stack from '@mui/material/Stack';
import { PieChart } from '@mui/x-charts/PieChart';
import { useContext } from 'react';
import style from '../styles/Game.module.css';
import supabase from '../supabase/client';
import AuthContext from '../contexts/AuthContext';
import Chat from '../components/GameComponents/Chat';

function Game() {
  const { profile } = useContext(AuthContext);
  const game = useLoaderData();
  console.log(game);

  const data = game.ratings.map((rate) => {
    return {
      label: rate.title,
      value: rate.count,
    };
  });

  const handleChat = async (event) => {
    event.preventDefault();
    const messageInput = event.currentTarget;
    const { message } = Object.fromEntries(new FormData(messageInput));
    if (typeof message === 'string' && message.trim().length !== 0) {
      try {
        const { error } = await supabase
          .from('messages')
          .insert([
            { profile_id: profile.id, game_id: game.id, content: message },
          ])
          .select();
        if (error) {
          // eslint-disable-next-line no-alert
          alert(error.message);
        } else {
          messageInput.reset();
        }
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert(error.message);
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <div className="container-fluid">
        <div className="container py-5">
          <div className="row py-5">
            <div className="col-12 col-md-6 my-5">
              <h2 className="display-3 fw-bold">{game.name}</h2>
              <button
                type="button"
                className="my-3 btn btn-outline-dark font-main rounded-0 px-3 py-3"
              >
                Aggiungi ai tuoi preferiti
              </button>
              <p className="lead font-main fw-bold text-secondary">
                Rating attuale
              </p>
              <div className="w-75">
                <Stack direction="row">
                  <PieChart
                    colors={['#06EFFF', '#0066FF', '#737378', '#38A616']}
                    series={[
                      {
                        data,
                        innerRadius: 30,
                        outerRadius: 100,
                        paddingAngle: 1,
                        cornerRadius: 10,
                        startAngle: -135,
                        endAngle: 180,
                        cx: 100,
                        cy: 100,
                      },
                    ]}
                    margin={{ right: 5 }}
                    width={400}
                    height={250}
                    slotProps={{
                      legend: {
                        direction: 'column',
                        position: { vertical: 'middle', horizontal: 'right' },
                        padding: 0,
                        itemMarkWidth: 10,
                        itemMarkHeight: 8,
                        markGap: 10,
                        itemGap: 20,
                        labelStyle: {
                          fontSize: 18,
                          fill: 'black',
                          fontFamily: '"Chakra Petch", sans-serif',
                          // fontWeight: 'bold',
                        },
                      },
                    }}
                  />
                </Stack>
              </div>
              <p className="fw-bold lead font-main text-secondary">
                About this game
              </p>
              <p className="small">{game.description_raw}</p>
            </div>
            <div className="col-12 col-md-6 my-5">
              <img
                src={game.background_image}
                className="d-block mx-auto"
                width={400}
                alt=""
              />
              {profile && (
                <div>
                  <div className={style.chatBox}>
                    <Chat game={game} />
                  </div>
                  <form onSubmit={handleChat} className="mt-3">
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        name="message"
                        className="form-control font-main rounded-0"
                        placeholder="Chat now..."
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                      />
                      <button
                        className="btn btn-dark font-main rounded-0 p-2"
                        type="submit"
                        id="button-addon2"
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export const getGameDetails = async ({ params }) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}games/${params.id}?key=${
      import.meta.env.VITE_API_KEY
    }`
  );
  const json = response.json();
  return json;
};

export default Game;
