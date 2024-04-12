import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
            <Link to="/cart">CART</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
