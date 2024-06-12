import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
import Games from '../components/StorageComponents/Games';
import style from '../styles/Storage.module.css';
import Genres from '../components/StorageComponents/Genres';

// Chiamata per precaricache i generi nella pagina Storage...questa chiamata va passata al react router dom.
export async function getGenres() {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}genres?key=${import.meta.env.VITE_API_KEY}`
  );
  const json = await response.json();
  return json.results;
}

function Storage() {
  const [page, setPage] = useState(1);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPaginatedGames() {
      setLoading(true);
      setError(null);
      // setGames([]);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}games?key=${import.meta.env.VITE_API_KEY}&page=${page}`
        );

        if (response.ok) {
          const json = await response.json();
          console.log('responding API... con page:', page);
          setGames((prev) => [...prev].concat(json.results));
        } else {
          const json = await response.json();
          console.log(json);
        }
      } catch (e) {
        setError(`Error in requesting games. - ${e.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchPaginatedGames();
  }, [page]);

  return (
    <div className={`container-fluid ${style.bgStorage}`}>
      <div className="container py-5">
        <div className="row py-5">
          <div className="col-12 col-md-3">
            <Genres />
            <div style={{ marginTop: '1000px' }} />
          </div>
          <Games
            loading={loading}
            error={error}
            games={games}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Storage;
