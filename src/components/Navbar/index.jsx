import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
const Navbar = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/shop">SHOP</Link>
          </li>
          <li>
            <Link>CART</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
