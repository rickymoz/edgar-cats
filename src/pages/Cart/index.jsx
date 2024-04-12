import React from "react";
import "./style.css";
const Cart = () => {
  const storedCats = JSON.parse(localStorage.getItem("cart")) || [];

  return (
    <div>
      <h2>Shopping Cart</h2>
      {storedCats.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <div className="cart-items">
          {storedCats.map((cat) => (
            <div className="cart-item" key={cat.id}>
              <img src={cat.image} alt={cat.name} />
              <div>
                <h3>name: {cat.name}</h3>
                <p>price: {cat.price} €</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
