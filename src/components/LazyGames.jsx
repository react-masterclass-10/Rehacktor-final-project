import { useEffect, useState } from 'react';
import ButtonUI from './ButtonUI';
import RatedGames from './RatedGames';

function LazyGames() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const intersectionCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // disconnettiti...
          setShow(true);
        }
      });
    };

    const target = document.querySelector('#lazy-games');

    const observer = new IntersectionObserver(intersectionCallback, {
      // root: document.querySelector('#lazy-games'),
      rootMargin: '500px',
      // threshold: 1.0,
    });

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div id="lazy-games" className="row">
      {/* Questo piccolo pezzo lo voglio rendirizzare solo se l'utente ci arriva con l'Intersection observer */}
      {show ? <RatedGames /> : null}
      <div className="col-12 text-center">
        <ButtonUI>Scopri piu giochi</ButtonUI>
      </div>
    </div>
  );
}

export default LazyGames;
