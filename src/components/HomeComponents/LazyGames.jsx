import { useEffect, useState, useRef } from 'react';
import ButtonUI from '../GeneralComponents/ButtonUI';
import RatedGames from './RatedGames';

function LazyGames() {
  const [show, setShow] = useState(false);
  const ref = useRef();

  useEffect(() => {
    let observer;

    const intersectionCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // disconnettiti...
          setShow(true);
          console.log(entry);
          observer.disconnect();
        }
      });
    };

    const target = ref.current;

    observer = new IntersectionObserver(intersectionCallback, {
      rootMargin: '500px',
    });

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="row">
      {/* Questo piccolo pezzo lo voglio rendirizzare solo se l'utente ci arriva con l'Intersection observer */}
      {show && <RatedGames />}
      <div className="col-12 text-center">
        <ButtonUI>Scopri piu giochi</ButtonUI>
      </div>
    </div>
  );
}

export default LazyGames;
