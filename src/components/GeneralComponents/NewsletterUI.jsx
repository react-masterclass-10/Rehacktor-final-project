import alertURL from '../../assets/alert.png';
import ButtonUI from './ButtonUI';
import style from '../../styles/Home.module.css';

function NewsletterUI() {
  return (
    <div id="newsletter" className={`container-fluid ${style.bgNewsletter}`}>
      <div className="container py-5">
        <div className="row pb-5 justify-content-center">
          <div className="col-12 col-md-9 text-center">
            <img src={alertURL} alt="alert" className="my-3" />
            <p className="h3 font-main text-uppercase fw-bold">
              {' '}
              Iscriviti alla newsletter ufficiale di Rehacktor 2077!
            </p>
            <p className="font-main lead">
              Dai giochi a molto altro, tieni aggiornato il tuo feed con le
              ultime notizie e annunci su tutto ciò che riguarda Rehacktor 2077!
            </p>
            <div className="input-group mb-3 d-md-flex align-items-end">
              <input
                type="email"
                className="form-control mx-3 font-main bg-transparent rounded-0 border-1 border-black"
                style={{
                  height: '55px',
                }}
                placeholder="Inserisci la tua email"
              />
              <div className="d-none d-md-block">
                <ButtonUI>Iscriviti</ButtonUI>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsletterUI;
