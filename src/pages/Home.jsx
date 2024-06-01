import { Link } from 'react-router-dom';
import style from '../styles/Home.module.css';
import playstationURL from '../assets/playstation.svg';
import xboxURL from '../assets/xbox.svg';
import ButtonUI from '../components/ButtonUI';

function Home() {
  return (
    <header className={style.masthead}>
      <div className="container h-100">
        <div className="row h-100 align-items-center">
          <div className="col-10 col-md-8">
            <h1 className="display-1 fw-bold">
              Ottinieni le ultime ReHacktor 2077 novità
            </h1>
            <p className="lead">
              L&apos;unica esperienza in cui potrai trovare tutti i videogiochi
              moderni <br /> e chattare live con altri gamers
            </p>
            <Link to="/altrapagina">
              <ButtonUI />
            </Link>
            <div className="mt-5">
              <img src={playstationURL} className="mx-5" alt="play logo" />
              <img src={xboxURL} alt="xbox logo" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Home;
