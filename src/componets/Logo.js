import React from 'react';

const Logo = ({ logo, name }) => {
  return (
    <>
      <div className="logo">
        <span role="img">{logo}</span>
        <h1>{name}</h1>
      </div>
    </>
  );
};

export default Logo;
