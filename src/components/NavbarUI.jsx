function NavbarUI() {
  return (
    <nav
      className="navbar navbar-expand-lg bg-transparent p-3 fixed-top"
      aria-label="Eighth navbar example"
    >
      <div className="container">
        <a className="navbar-brand font-main fw-bold" href="/">
          Rehacktor
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample07"
          aria-controls="navbarsExample07"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample07">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 links-nav">
            <li className="nav-item mx-3">
              <a
                className="nav-link text-white active"
                aria-current="page"
                href="/"
              >
                Tutti i giochi
              </a>
            </li>
            <li className="nav-item mx-3">
              <a className="nav-link text-white" href="/">
                Archivio recensioni
              </a>
            </li>
            <li className="nav-item mx-3 dropdown">
              <a
                className="nav-link dropdown-toggle text-white"
                href="/"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Accedi
              </a>
              <ul className="dropdown-menu rounded-0 links-nav">
                <li className="my-2">
                  <a className="dropdown-item text-white" href="/">
                    Registrati
                  </a>
                </li>
                <li className="my-2">
                  <a className="dropdown-item text-white" href="/">
                    Login
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarUI;
