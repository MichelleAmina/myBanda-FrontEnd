import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import cartReducer, {getTotals} from './cartSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
});

store.dispatch(getTotals())

export default store;