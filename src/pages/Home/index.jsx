import React from "react";
import { Link } from "react-router-dom";
import { GiCat } from "react-icons/gi";
import "./style.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-background"></div>
      <div className="home-content">
        <h1>Welcome to Edgar's Kitten Shop</h1>
        <p>Find the perfect kitten for your family!</p>
        <Link to="/shop" className="shop-button">
          SEE KITTENS <GiCat className="cat-icon" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
