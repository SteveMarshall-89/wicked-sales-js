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
          <a className="cart text-white">
            <i className="fas fa-shopping-cart"></i> {props.cartItemCount} Items
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
