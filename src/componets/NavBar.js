import React from 'react';
import Search from './Search';
import Logo from './Logo';

const NavBar = () => {
  return (
    <>
      <nav className="nav-bar">
        <Logo logo="🍿" name="usePopcorn" />
        <Search />
        <p className="num-results">
          Found <strong>X</strong> results
        </p>
      </nav>
    </>
  );
};

export default NavBar;
