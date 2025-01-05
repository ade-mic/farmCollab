import React, { useState, useEffect } from "react";

const [cartItems, setCartItems] = useState([]);

const handleAddToCart = (produce) => {
  setCartItems((prevItems) => {
    const existingItem = prevItems.find((item) => item._id === produce._id);
    if (existingItem) {
      return prevItems.map((item) =>
        item._id === produce._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }
    return [...prevItems, { ...produce, quantity: 1 }];
  });
};

const handleRemoveItem = (produce) => {
  setCartItems((prevItems) =>
    prevItems.filter((item) => item._id !== produce._id)
  );
};

const handleCheckout = () => {
  console.log("Proceeding to checkout with items:", cartItems);
  // Add your checkout logic here
};

export { handleAddToCart, handleRemoveItem, handleCheckout };