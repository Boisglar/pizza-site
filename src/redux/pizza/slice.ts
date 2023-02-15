import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPizzas } from './asyncActions';
import { Pizza, PizzaSliceState, Status } from './types';



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
export const { setPizzas } = pizzaSlice.actions;
export default pizzaSlice.reducer;
