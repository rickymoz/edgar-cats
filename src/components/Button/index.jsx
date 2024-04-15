import React from "react";
import "./style.css";

const Button = ({ text, onClick, scheme }) => {
  const buttonClassName = `custom-button ${scheme}`;

  return (
    <button className={buttonClassName} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
