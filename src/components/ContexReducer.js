import React, { createContext, useContext, useReducer } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const existingIndex = state.findIndex(
        item => item.id === action.item.id && item.size === action.item.size
      );

      if (existingIndex !== -1) {
        const updatedItem = {
          ...state[existingIndex],
          qty: state[existingIndex].qty + action.item.qty,
          price: (parseFloat(state[existingIndex].price) + parseFloat(action.item.price)).toFixed(2)
        };

        const updatedCart = [...state];
        updatedCart[existingIndex] = updatedItem;
        return updatedCart;
      } else {
        return [...state, action.item];
      }
    }

    case 'UPDATE': {
      return [...action.cart];
    }

    case 'REMOVE': {
      return state.filter((_, idx) => idx !== action.index);
    }

    case 'CLEAR': {
      return [];
    }

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
