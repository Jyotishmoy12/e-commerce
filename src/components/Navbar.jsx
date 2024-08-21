import React from 'react';
import '../styles/Navbar.css';

const Navbar = ({ isMenuOpen, toggleMenu }) => {
  return (
    <nav className="navbar-container">
      <div className="logo">Your Ecommerce Site</div>
      <div className="mobile-menu-icon" onClick={toggleMenu}>
        {isMenuOpen ? 'X' : '☰'}
      </div>
      <ul className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
        <li><a href="#">Home</a></li>
        <li><a href="#">Products</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;