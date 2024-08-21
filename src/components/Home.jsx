import React, { useState } from 'react';
import '../styles/Home.css';
import Navbar from './Navbar';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <div className="home-container">
        <div className="hero-section">
          <h1 className="animate__animated animate__fadeInDown animate__delay-1s">Discover the Best Products</h1>
          <p className="animate__animated animate__fadeInUp animate__delay-2s">Elevate your shopping experience with our curated selection.</p>
          <button className="animate__animated animate__bounceIn animate__delay-3s">Shop Now</button>
        </div>
        <div className="featured-products">
          <div className="product-card animate__animated animate__fadeInLeft animate__delay-1s">
            <div className="product-details">
              <h3>Product 1</h3>
              <p>$49.99</p>
              <button>Add to Cart</button>
            </div>
          </div>
          <div className="product-card animate__animated animate__fadeInUp animate__delay-2s">
            <div className="product-details">
              <h3>Product 2</h3>
              <p>$29.99</p>
              <button>Add to Cart</button>
            </div>
          </div>
          <div className="product-card animate__animated animate__fadeInRight animate__delay-3s">
            <div className="product-details">
              <h3>Product 3</h3>
              <p>$59.99</p>
              <button>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;