import React from 'react';

function Header(props) {
  return (
    <header>
      <div className="container">
        <nav className="navbar sticky-top navbar-dark bg-dark">
          <i className="fas fa-poo-storm fa-5x"></i>
          <a className="navbar-brand" href="#">
            <h1>{props.storeName}</h1>
          </a>
          <i className="fas fa-poo-storm fa-5x"></i>
        </nav>
      </div>
    </header>
  );
}

export default Header;
