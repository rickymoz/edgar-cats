import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  };

  useEffect(() => {
    updateCartCount();
  }, []);

  return (
    <>
      <nav className={isOpen ? "nav open" : "nav"}>
        <div className="menu-btn" onClick={toggleMenu}>
          <div
            className={isOpen ? "menu-btn__burger open" : "menu-btn__burger"}
          >
            <div className="menu-btn__burger-line"></div>
            <div className="menu-btn__burger-line"></div>
            <div className="menu-btn__burger-line"></div>
          </div>
        </div>
        <ul className={isOpen ? "nav-links open" : "nav-links"}>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/shop">SHOP</Link>
          </li>
          <li>
            <Link to="/cart">
              CART <span id="cart-count">({cartCount})</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
