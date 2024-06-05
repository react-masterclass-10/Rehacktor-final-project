import { useState, useEffect } from 'react';
import style from '../styles/Home.module.css';

function RatedGames() {
  const [ratedGames, setRatingGames] = useState([]);

  useEffect(() => {
    async function fetchRatedGames() {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}games?key=${import.meta.env.VITE_API_KEY}&dates=2001-01-01,2001-12-31&ordering=-rating`
      );
      const json = await response.json();
      console.log('Calling API rated games...');
      setRatingGames(json.results);
    }
    fetchRatedGames();
  }, []);

  return (
    <>
      {ratedGames.slice(0, 4).map((game) => (
        <div className="col-12 col-md-3 mb-3" key={game.id}>
          <div className={`card rounded-0 mx-auto ${style.cardGame}`}>
            <img
              className={style.cardGameImage}
              src={game.background_image}
              alt="game"
            />
            <h5 className={`font-main ${style.cardGameName}`}>{game.name}</h5>
          </div>
        </div>
      ))}
    </>
  );
}

export default RatedGames;
