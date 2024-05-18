import React, { createContext, useReducer, useEffect } from "react";

// Function to get cart data from local storage
const getLocalStorageCart = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

// Initial state
const initialState = {
    cart: getLocalStorageCart(),
};

// Reducer function
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const updatedCartAdd = [...state.cart, action.payload];
            return {
                ...state,
                cart: updatedCartAdd,
            };
        case 'REMOVE_FROM_CART':
            const updatedCartRemove = state.cart.filter(item => item.id !== action.payload.id);
            return {
                ...state,
                cart: updatedCartRemove,
            };
        case 'CLEAR_CART':
            return {
                ...state,
                cart: [],
            };
        default:
            return state;
    }
};

// Create context
export const CartContext = createContext();

// Context provider component
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Update local storage whenever cart state changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.cart));
    }, [state.cart]);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};
