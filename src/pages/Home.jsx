import { Link } from 'react-router-dom';
import style from '../styles/Home.module.css';
import playstationURL from '../assets/playstation.svg';
import xboxURL from '../assets/xbox.svg';
import ButtonUI from '../components/GeneralComponents/ButtonUI';
import NewsletterUI from '../components/GeneralComponents/NewsletterUI';
import LazyGames from '../components/HomeComponents/LazyGames';

function Home() {
  return (
    <>
      <header className={style.masthead}>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-10 col-md-8">
              <h1 className="display-1 fw-bold">
                Ottinieni le ultime ReHacktor 2077 novità
              </h1>
              <p className="lead">
                L&apos;unica esperienza in cui potrai trovare tutti i
                videogiochi moderni <br /> e chattare live con altri gamers
              </p>
              <Link to="/storage">
                <ButtonUI>Archivio Giochi</ButtonUI>
              </Link>
              <div className="mt-5">
                <img src={playstationURL} className="mx-5" alt="play logo" />
                <img src={xboxURL} alt="xbox logo" />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className={`container-fluid ${style.bgLegend}`}>
        <div className="container py-5">
          <div className="row py-5 justify-content-center">
            <div className="col-12 col-md-8 text-center">
              <div className={`card ${style.cardLegend} px-5 py-5 rounded-0`}>
                <div className="card-body d-flex justify-content-center">
                  <div className="col-12 col-md-8">
                    <h2>La tua leggenda inizia qui</h2>
                    <p className="text-white">
                      Metti i panni di V, un mercenario cyberpunk in cerca di
                      lavoro, e fai tutto il necessario per farti un nome a
                      Night City, una megalopoli ossessionata dal potere, dal
                      glamour e dalle modifiche corporee. Qui nascono le
                      leggende. Quale sarà la tua?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`container-fluid ${style.bgGames}`}>
        <div className="container py-5">
          <div className="row my-5 py-5 justify-content-center">
            <div className="col-12 col-md-6 text-center">
              <h2>Benvenuto nel futuro oscuro</h2>
              <p className="lead">
                Immergiti nell&apos;universo di Rehacktor, qui potrai trovare
                tutti i giochi del momento, ti consigliamo di registrare i tuoi
                giochi preferiti per poi poter chattare live con altri games
                sulle novitá in corso. Qui di sotto ci sono quelli con lo score
                e rating piu alto, sicuramente otterrai delle risposte dai tuoi
                colleghi gamers.
              </p>
            </div>
          </div>
          {/* row che contiene i rated giochi caricati */}
          <LazyGames />
        </div>
      </div>
      <NewsletterUI />
    </>
  );
}

export default Home;
