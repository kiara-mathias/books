// import react from "react";
// import Main from "../Components/Main";
// import Nav from "../Components/Nav";
// import CartItemsContainer from "./CartItemsContainer";

// import { Link } from "react-router-dom";

// const Cart = (cartItems) => {
//   return (
//     <>
//       <body className="cartB">
//         <CartItemsContainer cartinfo={cartItems} />
//       </body>
//     </>
//   );
// };
// export default Cart;
// import React, { useContext } from "react";
// import CartItemsContainer from "./CartItemsContainer";
// import { CartContext } from "../App";

// const Cart = () => {
//   const { cartItems } = useContext(CartContext);

//   return (
//     <div className="cartB">
//       <CartItemsContainer cartItems={cartItems} />
//     </div>
//   );
// };

// export default Cart;
import React, { useContext } from "react";
import CartItemsContainer from "./CartItemsContainer";
import { CartContext } from "../App";

const Cart = () => {
  const { cartItems, removeItem } = useContext(CartContext);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    const listPrice = item.saleInfo ? item.saleInfo.listPrice : {};
    return total + (listPrice.amount || 0);
  }, 0);

  return (
    <div className="cartB">
      <CartItemsContainer cartItems={cartItems} onRemove={removeItem} />
      <div className="total-price">
        <h2>Total Bill: ₹{totalPrice}</h2>
      </div>
    </div>
  );
};

export default Cart;
