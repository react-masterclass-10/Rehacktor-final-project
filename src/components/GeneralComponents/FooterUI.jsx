import { FaFacebookSquare, FaTwitterSquare, FaTwitch } from 'react-icons/fa';
import { FaSquareInstagram } from 'react-icons/fa6';
import { AiFillDiscord } from 'react-icons/ai';

function FooterUI() {
  return (
    <footer className="container-fluid footer">
      <div className="container py-5">
        <footer>
          <ul className="nav my-4 justify-content-center border-bottom border-secondary pb-3 mb-3">
            <li className="nav-item">
              <a href="/" className="nav-link px-2">
                Terms of Use & Privacy Policy
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link px-2">
                Careers
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link px-2">
                User agreement
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link px-2">
                Fan Content Guidelines
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link px-2">
                Cookie Declaration
              </a>
            </li>
          </ul>
          <ul className="nav my-4 justify-content-center border-bottom border-secondary pb-3 mb-3">
            <li className="nav-item">
              <a href="/" className="nav-link px-2 icons">
                <FaFacebookSquare />
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link px-2 icons">
                <FaSquareInstagram />
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link px-2 icons">
                <FaTwitterSquare />
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link px-2 icons">
                <AiFillDiscord />
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link px-2 icons">
                <FaTwitch />
              </a>
            </li>
          </ul>
          <div className="row justify-content-between align-items-center">
            <div className="col-12 col-md-4">
              <p className="lead fw-bold text-white font-main">Rehacktor</p>
            </div>
            <div className="col-12 col-md-6">
              <p className="font-main text-secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Delectus voluptatem a neque doloribus nulla laborum modi odit.
                Maiores similique quia aspernatur ipsa inventore voluptatem,
                fugit praesentium dolorum cupiditate, dolore impedit.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </footer>
  );
}

export default FooterUI;
