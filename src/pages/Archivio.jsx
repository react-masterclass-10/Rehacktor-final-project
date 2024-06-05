import { useEffect, useState } from 'react';
import style from '../styles/Storage.module.css';

function Archivio() {
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchPaginatedGames() {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}games?key=${import.meta.env.VITE_API_KEY}&page=${page}&page_size=20`
      );
      const json = await response.json();
      console.log(json);
    }
    fetchPaginatedGames();
  }, [page]);

  return (
    <div className={`container-fluid ${style.bgStorage}`}>
      <div className="container py-5">
        <div className="row py-5">
          {/* <div className="col-12 col-md-3">
            
          </div> */}
          <div className="col-12 col-md-9">
            <h1>Mostra i video giochi</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Archivio;
