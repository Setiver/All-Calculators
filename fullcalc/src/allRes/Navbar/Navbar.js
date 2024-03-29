import React from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

const NavbarSide = () => {
  return (
    <div className="container-fluid">
      <button
        className="navbar-toggler ms-auto"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasDarkNavbar"
        aria-controls="offcanvasDarkNavbar">
        <span className="navbar-icon-emoji">♻</span>
      </button>
      <div
        className="offcanvas offcanvas-end text-bg-dark"
        tabIndex="-1"
        id="offcanvasDarkNavbar"
        aria-labelledby="offcanvasDarkNavbarLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
            RPG
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/damage">
                Damage
              </Link>
            </li>
            {isMobile ? (
              <li className="nav-item">
                <Link className="nav-link" to="/healMobile">
                  Heal for Moblie
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/heal">
                  Heal
                </Link>
              </li>
            )}
            {isMobile ? (
              ''
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/runes">
                  Runes
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavbarSide;
