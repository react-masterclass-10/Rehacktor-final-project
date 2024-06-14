import { useState, useEffect } from 'react';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
import style from '../../styles/Home.module.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

function RatedGames() {
  const [ratedGames, setRatingGames] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchRatedGames() {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}games?key=${import.meta.env.VITE_API_KEY}&dates=2001-01-01,2001-12-31&ordering=-rating`
        );
        const json = await response.json();
        console.log('Calling API rated games...');
        setRatingGames(json.results);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchRatedGames();
  }, []);

  return (
    <>
      {loading && (
        <div className="col-12 text-center">
          <p className="font-main fw-bold lead">
            Caricando i giochi piú visitati dai gamers...
          </p>
        </div>
      )}
      {ratedGames.slice(0, 4).map((game) => {
        return (
          <div className="col-12 col-md-3 mb-3" key={game.slug}>
            <div className={`card rounded-0 mx-auto ${style.cardGame}`}>
              {/* <LazyLoadImage
                className={style.cardGameImage}
                alt={game.name}
                effect="opacity"
                src={game.background_image}
              /> */}
              <img
                className={style.cardGameImage}
                src={game.background_image}
                alt="game"
              />
              <h5 className={`font-main ${style.cardGameName}`}>{game.name}</h5>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default RatedGames;
