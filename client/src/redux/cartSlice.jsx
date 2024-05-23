import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
    cartItems: localStorage.getItem("cartItems") 
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    shippingFee: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                cartItem => cartItem.id === action.payload.id
            );
            const quantityToAdd = action.payload.cartQuantity || 1; 

            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += quantityToAdd; 
                toast.info(`Increased ${state.cartItems[itemIndex].name} cart quantity by ${quantityToAdd}`, {
                    position: 'top-center',
                });
            } else {
                const tempProduct = { ...action.payload, cartQuantity: quantityToAdd };
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.name} added to cart`, {
                    position: "top-center",
                });
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

            cartSlice.caseReducers.getTotals(state);
        },
        removeFromCart(state, action) {
            const nextCartItems = state.cartItems.filter(
                cartItem => cartItem.id !== action.payload.id
            );

            state.cartItems = nextCartItems;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            toast.error(`${action.payload.name} removed from cart`, {
                position: "top-center",
            });

            cartSlice.caseReducers.getTotals(state);
        },
        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
              (item) => item.id === action.payload.id
            );

            if (state.cartItems[itemIndex].cartQuantity > 1) {
              state.cartItems[itemIndex].cartQuantity -= 1;

              toast.info("Decreased product quantity", {
                position: "top-center",
              });
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
              const nextCartItems = state.cartItems.filter(
                (item) => item.id !== action.payload.id
              );

              state.cartItems = nextCartItems;

              toast.error("Product removed from cart", {
                position: "top-center",
              });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

            cartSlice.caseReducers.getTotals(state);
        },
        clearCart(state) {
            state.cartItems = [];
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            toast.error("Cart cleared", { position: "top-center" });

            cartSlice.caseReducers.getTotals(state);
        },
        
        getTotals(state) {
            let { total, quantity } = state.cartItems.reduce(
              (cartTotal, cartItem) => {
                const { price, cartQuantity } = cartItem;
                const itemTotal = price * cartQuantity;

                cartTotal.total += itemTotal;
                cartTotal.quantity += cartQuantity;

                return cartTotal;
              },
              {
                total: 0,
                quantity: 0,
              }
            );
            total = parseFloat(total.toFixed(2));
            console.log("Calculated total:", total, "Calculated quantity:", quantity);
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        },
        setShippingFee(state, action) {
            state.shippingFee = action.payload;
        },
    },
});

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals, setShippingFee } = cartSlice.actions;

export default cartSlice.reducer;



