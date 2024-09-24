import react from "react";
import "./style.css";
import { UserContext } from "../App";
import { CartContext } from "../App";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import App from "../App";
import Main from "./Main";
import Nav from "./Nav";

const Modal = ({ show, item, onClose }) => {
  if (!show) {
    return null;
  }
  let thumbnail =
    item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
  let amount = item.saleInfo.listPrice && item.saleInfo.listPrice.amount;

  const user = useContext(UserContext);
  // const cart = useContext(CartContext);
  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();

 
  const handleCart = () => {
    if (user) {
      setCartItems([...cartItems, item]); // Add the entire `item` to the cart
      alert(`${item.volumeInfo.title} is added to cart`);
    } else {
      navigate("/login");
      alert("Please login or SignUp first...");
    }
  };

  return (
    <>
      <div className="overlay">
        <div className="overlay-inner">
          <button className="close" onClick={onClose}>
            <i class="fas fa-times"></i>
          </button>
          <div className="inner-box">
            <img src={thumbnail} alt="" />
            <div className="info">
              <h1>{item.volumeInfo.title}</h1>
              <h3>{item.volumeInfo.authors}</h3>
              <h4>{item.volumeInfo.pageCount}</h4>
              <h4>
                {item.volumeInfo.publisher}
                <span>{item.volumeInfo.publishedDate}</span>
              </h4>
              <h3> ₹{amount}</h3>
              <br />
              <a href={item.volumeInfo.previewLink}>
                <button>More</button>
              </a>
            </div>
          </div>
          <h4 className="description">{item.volumeInfo.description}</h4>
          <button onClick={handleCart} className="cart-btn">
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
};
export default Modal;
