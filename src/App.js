import React, { createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import app from "./firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Main from "./Components/Main";
import "./styles.css";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Cart from "./Billing/Cart";

export const UserContext = createContext({});
export const CartContext = createContext({});

export default function App() {
  const auth = getAuth(app);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setAuthenticatedUser(user);
      } else {
        setAuthenticatedUser(null);
      }
    });
  }, [auth]);

  const removeItem = (itemToRemove) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item !== itemToRemove)
    );
  };

  return (
    <div className="App">
      <UserContext.Provider value={authenticatedUser}>
        <CartContext.Provider value={{ cartItems, setCartItems, removeItem }}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/books" element={<Main />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </CartContext.Provider>
      </UserContext.Provider>
    </div>
  );
}
