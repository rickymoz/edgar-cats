import React from "react";
import "./style.css";
import Swal from "sweetalert2";
import Button from "../../components/Button";

const Cart = () => {
  const storedCats = JSON.parse(localStorage.getItem("cart")) || [];

  const handleCheckout = () => {
    Swal.fire({
      icon: "success",
      title: "Purchase successful!",
      html: "<p>Thank you for your purchase.</p><p>We are redirecting you to the shop...</p>",
      timer: 2500,
      timerProgressBar: true,
      showConfirmButton: false,
    }).then(() => {
      localStorage.removeItem("cart");
      window.location.href = "/shop";
    });
  };

  const aggregatedCats = aggregateCats(storedCats);

  return (
    <div className="cart">
      <div className="container">
        {aggregatedCats.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div className="cart-items">
            {aggregatedCats.map((cat) => (
              <CartItem key={cat.id} cat={cat} />
            ))}
            <div className="total">
              <p>Total: {Total(storedCats)} €</p>
            </div>
            <Button text="Checkout" scheme="primary" onClick={handleCheckout} />
          </div>
        )}
      </div>
    </div>
  );
};

const CartItem = ({ cat }) => {
  return (
    <div className="cart-item">
      <img src={cat.image} alt={cat.name} />
      <div className="item-details">
        <h3>{cat.name}</h3>
        <span>{cat.quantity > 1 ? `x${cat.quantity}` : "x1"}</span>
        <p>{cat.price} €</p>
      </div>
    </div>
  );
};

const Total = (items) => {
  return items.reduce((total, item) => total + item.price, 0);
};

const aggregateCats = (cats) => {
  const aggregated = [];
  cats.forEach((cat) => {
    const existingCat = aggregated.find((c) => c.id === cat.id);
    if (existingCat) {
      existingCat.quantity++;
    } else {
      aggregated.push({ ...cat, quantity: 1 });
    }
  });
  return aggregated;
};

export default Cart;
