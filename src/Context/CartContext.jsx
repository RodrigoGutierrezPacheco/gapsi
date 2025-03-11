import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const INCREASE_QUANTITY = "INCREASE_QUANTITY";
const DECREASE_QUANTITY = "DECREASE_QUANTITY";
const CLEAR_CART = "CLEAR_CART";

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, { ...action.payload, quantity: 1 }];
    case REMOVE_FROM_CART:
      return state.filter((_, index) => index !== action.payload);
    case INCREASE_QUANTITY:
      return state.map((item, index) =>
        index === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    case DECREASE_QUANTITY:
      return state
        .map((item, index) =>
          index === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
    case CLEAR_CART:
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === product.id);
    if (existingItemIndex !== -1) {
      dispatch({ type: INCREASE_QUANTITY, payload: existingItemIndex });
    } else {
      dispatch({ type: ADD_TO_CART, payload: product });
    }
  };

  const removeFromCart = (index) => {
    dispatch({ type: REMOVE_FROM_CART, payload: index });
  };

  const increaseQuantity = (index) => {
    dispatch({ type: INCREASE_QUANTITY, payload: index });
  };

  const decreaseQuantity = (index) => {
    dispatch({ type: DECREASE_QUANTITY, payload: index });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART }); 
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);