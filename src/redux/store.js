import { configureStore } from '@reduxjs/toolkit';

import filter from './slices/filterSlice';
import cart from './slices/cardSlice';
import pizzas from './slices/pizzaSlice';

export const store = configureStore({
  reducer: {
    pizzas,
    filter,
    cart,
  },
});
