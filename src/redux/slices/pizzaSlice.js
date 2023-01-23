import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async ({ order, sortBy, category, search, currentPage }) => {
    const { data } = await axios.get(
      `https://63b708764f17e3a931c8adda.mockapi.io/item?page=${currentPage}&limit=4&${category}${search}&sortBy=${sortBy}&order=${order}`,
    );
    return data;
  },
);

const initialState = {
  pizzas: [],
  status: 'loading',
};

const pizzaSlice = createSlice({
  name: 'Pizza',
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state, action) => {
      state.status = 'loaging';
      state.pizzas = [];
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'error';
      state.pizzas = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.pizzas = action.payload;
      state.status = 'success';
    },
  },
});
export const selectPizzaData = (state) => state.pizzas;
export const { setPizzas } = pizzaSlice.actions;
export default pizzaSlice.reducer;
