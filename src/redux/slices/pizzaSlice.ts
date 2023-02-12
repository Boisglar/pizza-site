import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  pizzas: Pizza[];
  status: Status;
}

const initialState: PizzaSliceState = {
  pizzas: [],
  status: Status.LOADING,
};
export type SearchPizzaParams = {
  order: string;
  sortBy: string;
  category: string;
  search: string;
  currentPage: string;
};

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizzas/fetchPizzasStatus',
  async ({ order, sortBy, category, search, currentPage }) => {
    const { data } = await axios.get(
      `https://63b708764f17e3a931c8adda.mockapi.io/item?page=${currentPage}&limit=4&${category}${search}&sortBy=${sortBy}&order=${order}`,
    );
    return data;
  },
);

const pizzaSlice = createSlice({
  name: 'Pizza',
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<Pizza[]>) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.pizzas = [];
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.pizzas = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.pizzas = action.payload;
      state.status = Status.SUCCESS;
    });
  },
});
export const selectPizzaData = (state: RootState) => state.pizzas;
export const { setPizzas } = pizzaSlice.actions;
export default pizzaSlice.reducer;
