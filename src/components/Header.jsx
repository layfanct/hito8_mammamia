import React from 'react';
import './Header.css';
import backgroundImage from '../assets/header.jpeg';

const Header = () => {
  return (
    <header className="header-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="overlay">
      <h1>¡Pizzería Mamma Mía!</h1>
      <p>¡Tenemos las mejores pizzas que podrás encontrar!</p>
      </div>
    </header>
  );
};

export default Header;
