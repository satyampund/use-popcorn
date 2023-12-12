import React from 'react';
import Logo from './Logo';

const NavBar = ({ children }) => {
  return (
    <>
      <nav className="nav-bar">
        <Logo logo="🍿" name="usePopcorn" />
        {children}
      </nav>
    </>
  );
};

export default NavBar;
