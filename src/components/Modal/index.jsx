import { GiTakeMyMoney } from "react-icons/gi";
import Swal from "sweetalert2";
import "./style.css";

const Modal = ({ cat, onClose }) => {
  const handleClick = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Unfortunately Edgar has already sold the last kitten!",
    });
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content">
        <div className="modal-body">
          <div className="cat-image">
            <img src={cat.image} alt={cat.name} />
          </div>
          <div className="cat-details">
            <h2>{cat.name}</h2>
            <p>
              <strong>Race:</strong> {cat.race}
            </p>
            <p>
              <strong>Color:</strong> {cat.color}
            </p>
            <p>
              <strong>Weight:</strong> {cat.weight} kg
            </p>
            <p>
              <strong>Age:</strong> {cat.age}
            </p>
            <p>
              <strong>Country:</strong> {cat.location}
            </p>
            <p>
              <strong>Price:</strong> {cat.price} €
            </p>
          </div>
          <div className="cat-actions">
            <button onClick={handleClick}>
              <GiTakeMyMoney className="shopping-basket-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
