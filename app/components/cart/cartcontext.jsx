// components/cart/CartContext.js
"use client";
import { createContext, useReducer, useContext } from "react";

// Initial State
const initialState = {
  cart: [],
};

// Reducer
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      const existing = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }

    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload._id),
      };
    case "INCREMENT":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DECREMENT":
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    default:
      return state;
  }
}
// Context
const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

// Provider
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeFromCart = (_id) => {
    dispatch({ type: "REMOVE_ITEM", payload: { _id } });
  };

  const increment = (_id) => {
    dispatch({ type: "INCREMENT", payload: { _id } });
  };

  const decrement = (_id) => {
    dispatch({ type: "DECREMENT", payload: { _id } });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addToCart,
        removeFromCart,
        increment,
        decrement,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
