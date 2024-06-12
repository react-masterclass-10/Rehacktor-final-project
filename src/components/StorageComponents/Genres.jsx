import { Link, useLoaderData } from 'react-router-dom';

function Genres() {
  const { genres } = useLoaderData();

  return (
    <div className="py-5">
      <p className="font-main lead fw-bold">Trova il tuo genere</p>
      <div className="pb-5" style={{ height: '400px', overflow: 'scroll' }}>
        {genres.map((genre) => (
          <Link
            className="text-decoration-none"
            key={genre.id}
            to={`/games/${genre.slug}/${genre.id}`}
          >
            <button
              type="button"
              className="d-block w-100 text-start mb-2 btn btn-dark rounded-0 font-main"
            >
              {genre.name}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Genres;
