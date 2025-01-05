import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize cartItems state with localStorage data or an empty array
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Save cartItems to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i._id === item._id);
      if (existingItem) {
        // Update the quantity if the item already exists
        return prevItems.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      // Add new item to the cart
      return [...prevItems, item];
    });
  };

  const removeFromCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i._id === item._id);
      if (existingItem && existingItem.quantity > 1) {
        // Decrease the quantity if more than 1
        return prevItems.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      // Remove the item if quantity is 1
      return prevItems.filter((i) => i._id !== item._id);
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
