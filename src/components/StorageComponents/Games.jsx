import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Loading from '../GeneralComponents/Loading';
import GameCardUI from './GameCardUI';
import AutocompleteSearch from './AutocompleteSearch';

function Games({ loading, error, games, setPage }) {
  const ref = useRef();

  useEffect(() => {
    const intersectionCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
    };

    const target = ref.current;

    const observer = new IntersectionObserver(intersectionCallback, {
      threshold: 0,
    });

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [setPage]);

  return (
    <>
      <div className="col-12 col-md-9">
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          Nuovi e di tendenza
        </motion.h1>
        <p className="font-main">
          Giochi visualizzati in base al numero di giocatori e data di rilascio
          del gioco
        </p>
        <AutocompleteSearch />
        <div className="row py-5">
          {error && <p className="lead font-main text-danger">{error}</p>}
          {loading && <Loading />}
          {games &&
            games.map((game) => (
              <div className="col-12 col-md-4 p-0" key={game.id}>
                <GameCardUI game={game} />
              </div>
            ))}
        </div>
      </div>

      <div ref={ref} id="targetPaginator" className="row">
        <div className="col-12 text-center">
          <p className="font-main fw-bold lead">
            sto caricando altri giochi...
          </p>
        </div>
      </div>
    </>
  );
}

export default Games;
